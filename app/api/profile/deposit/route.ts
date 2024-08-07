import type { NextRequest } from "next/server";
import { stripe } from "@/utils/stripe/config";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface SessionSettings {
	payment_method_types: Stripe.Checkout.SessionCreateParams.PaymentMethodType[];
	line_items: LineItem[];
	mode: "payment";
	success_url: string;
	cancel_url: string;
	client_reference_id: string;
	customer: string;
	expires_at: number;
}

interface LineItem {
	price: string;
	quantity: number;
}

export async function GET(req: NextRequest) {
	const supabase = createClient();
	const { data: auth } = await supabase.auth.getUser();

	if (!auth.user) {
		return sendResponse("Není přihlášený uživatel", null, 401);
	}

	const { data: profile } = await supabase
		.from("profiles")
		.select("stripe_customer")
		.eq("id", auth.user.id)
		.single();

	if (!profile) {
		return sendResponse(
			"Váš účet nemá profil. Kontaktujte podporu.",
			null,
			400
		);
	}

	if (!profile.stripe_customer) {
		return sendResponse(
			"Váš účet není propojen s platební bránou. Kontaktujte podporu.",
			null,
			400
		);
	}

	const { searchParams } = new URL(req.url);
	const depositedAmount: number = Number(searchParams.get("amount"));

	if (isNaN(depositedAmount) || !Number.isFinite(depositedAmount)) {
		return sendResponse("Neplatná hodnota pro množství", null, 400);
	}

	if (depositedAmount < 100 || depositedAmount > 20000) {
		return sendResponse("Počet musí být v rozmezí 100 - 20 000", null, 400);
	}

	const newTimestamp = Math.floor(Date.now() / 1000) + 3600;

	const sessionSettings: SessionSettings = {
		payment_method_types: ["card"],
		line_items: [
			{ price: process.env.COIN_STRIPE_PRICE_ID!, quantity: depositedAmount },
		],
		mode: "payment",
		success_url: `${process.env.NEXT_PUBLIC_URL}/profil/vklad/uspech`,
		cancel_url: `${process.env.NEXT_PUBLIC_URL}/profil/vklad?stav=zruseno`,
		client_reference_id: auth.user.id,
		customer: profile.stripe_customer,
		expires_at: newTimestamp,
	};

	const { url } = await stripe.checkout.sessions.create(sessionSettings);

	const tenMinutes = 10 * 60 * 1000;
	cookies().set("depositsuccess", "true", {
		expires: Date.now() + tenMinutes,
	});

	return sendResponse(null, url, 200);
}

function sendResponse(
	error: string | null,
	url: string | null,
	status: number
) {
	const send = {
		error: error,
		url: url,
	};
	return new Response(JSON.stringify(send), { status: status });
}
