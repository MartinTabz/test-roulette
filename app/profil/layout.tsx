import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = createClient();

	const { data: auth } = await supabase.auth.getUser();

	if (!auth.user) {
		redirect("/prihlasit");
	}

	return <main>{children}</main>;
}
