import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Test Roulette",
	description: "Testovací webová aplikace se hrou kasína",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="cs">
			<body className={inter.className}>
				<main>{children}</main>
			</body>
		</html>
	);
}
