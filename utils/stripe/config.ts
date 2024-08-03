import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	appInfo: {
		name: "Test Roulette",
		version: "0.0.1",
		url: "https://github.com/MartinTabz/test-roulette",
	},
});
