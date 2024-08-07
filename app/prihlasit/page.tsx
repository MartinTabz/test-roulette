import DiscordSignInButton from "@/components/auth/DiscordSignInButton";

export default function SignInPage() {
	return (
		<section className="h-[calc(100svh-3.5rem)] md:h-[calc(100svh-5rem)] min-h-[400px] flex items-center justify-center">
			<DiscordSignInButton />
		</section>
	);
}
