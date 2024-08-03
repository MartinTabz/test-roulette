import { createClient } from "@/utils/supabase/server";

export default async function IndexPage() {
	const supabase = createClient();

	const { data: auth } = await supabase.auth.getUser();
	return (
		<div>
			<h1>Hello World</h1>
			<pre>{JSON.stringify(auth.user, null, 2)}</pre>
		</div>
	);
}
