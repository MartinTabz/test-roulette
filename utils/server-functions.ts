"use server";

type GetUserWithProfile = {
	loggedIn: boolean;
	balance: number;
	username: string;
	avatarUrl: string;
};

export async function getUserWithProfile(supabase: any) {
	const { data: auth } = await supabase.auth.getUser();

	if (!auth.user) {
		return null;
	}

	const { data: profile, error } = await supabase
		.from("profiles")
		.select("balance")
		.eq("id", auth.user.id)
		.single();

	if (error) {
		console.error(`GetUserWithProfile - ${error.message}`);
		return null;
	} else if (!profile) {
		console.error(
			`GetUserWithProfile - Nebyl nalezen profil i když uživatel je přihlášen`
		);
		return null;
	}

	console.log(auth.user);

	const dataToReturn: GetUserWithProfile = {
		loggedIn: true,
		balance: profile.balance,
		username: auth.user.user_metadata.full_name,
		avatarUrl: auth.user.user_metadata.avatar_url,
	};

	return dataToReturn;
}
