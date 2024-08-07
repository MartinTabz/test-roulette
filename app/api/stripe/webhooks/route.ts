import Stripe from "stripe";
import { stripe } from "@/utils/stripe/config";
import { getServiceSupabase } from "@/utils/supabase/service";

const relevantEvents = new Set(["checkout.session.completed"]);

const supabase = getServiceSupabase();

export async function POST(req: Request) {
	const body = await req.text();
	const sig = req.headers.get("stripe-signature") as string;
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	let event: Stripe.Event;

	try {
		if (!sig || !webhookSecret)
			return new Response("Webhook secret not found.", { status: 400 });
		event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
		console.log(`Webhook received: ${event.type}`);
	} catch (err: any) {
		console.log(`Error message: ${err.message}`);
		return new Response(`Webhook Error: ${err.message}`, { status: 400 });
	}

	if (relevantEvents.has(event.type)) {
		try {
			switch (event.type) {
				case "checkout.session.completed":
					const obj = event.data.object;

					const lineItems = await stripe.checkout.sessions.listLineItems(
						obj.id
					);

					const { data: profile } = await supabase
						.from("profiles")
						.select("balance")
						.eq("id", obj.client_reference_id)
						.single();

					if (!profile || !profile.balance) {
						console.log(`Client reference ID: ${obj.client_reference_id}`);
						throw new Error("Nebyl nalezen profil");
					}

					const { error } = await supabase
						.from("profiles")
						.update({
							balance: profile.balance + lineItems.data[0].amount_total,
						})
						.eq("id", obj.client_reference_id)
						.select()
						.single();

					if (error) {
						console.log(error.message);
						throw new Error("Something went wrong while saving balance");
					}

					break;
				default:
					throw new Error("Unhandled relevant event!");
			}
		} catch (error) {
			console.error(error);
			return new Response(
				"Webhook handler failed. View your Next.js function logs.",
				{
					status: 400,
				}
			);
		}
	} else {
		return new Response(`Unsupported event type: ${event.type}`, {
			status: 400,
		});
	}
	return new Response(JSON.stringify({ received: true }));
}
