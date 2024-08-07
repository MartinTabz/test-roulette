import type { Metadata } from "next";
import { Roboto, Unbounded } from "next/font/google";
import "./globals.css";
import NotificationProvider from "@/utils/contexts/NotificationContext";
import Navigation from "@/components/Navigation";
import { createClient } from "@/utils/supabase/server";
import { getUserWithProfile } from "@/utils/server-functions";

const roboto = Roboto({
	weight: ["300", "400", "500", "700", "900"],
	subsets: ["latin"],
	style: ["normal"],
	display: "swap",
});

const unbounded = Unbounded({
	subsets: ["latin"],
	variable: "--font-unbounded",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Test Roulette",
	description: "Testovací webová aplikace se hrou kasína",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = createClient();
	const user = await getUserWithProfile(supabase);
	return (
		<html lang="cs">
			<body className={`${roboto.className} ${unbounded.variable}`}>
				<NotificationProvider>
					<Navigation user={user} />
					<main>{children}</main>
				</NotificationProvider>
			</body>
		</html>
	);
}
