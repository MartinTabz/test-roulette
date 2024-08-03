"use client";

import { createClient } from "@/utils/supabase/client";
import { FaDiscord } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { useState } from "react";

export default function DiscordSignInButton() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSignIn = async () => {
		setIsLoading(true);
		const supabase = createClient();
		await supabase.auth.signInWithOAuth({
			provider: "discord",
			options: {
				redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
			},
		});
	};

	return (
		<button
			className="flex items-center font-bold justify-center gap-2 bg-[#5865F2] text-white py-3 px-5 rounded-md cursor-pointer hover:bg-[#4752d0] hover-effect"
			onClick={handleSignIn}
		>
			{isLoading ? (
				<FiLoader className="text-[25px] animate-spin" />
			) : (
				<FaDiscord className="text-[25px]" />
			)}
			Přihlásit se přes Discord
		</button>
	);
}
