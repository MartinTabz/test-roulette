import { createClient } from "@/utils/supabase/server";
import { getUserWithProfile } from "@/utils/server-functions";
import { redirect, notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import DepositSuccessCheck from "@/components/profile/DepositSuccessCheck";
import { formatNumberToCurrency } from "@/utils/client-functions";
import CoinIcon from "@/public/coin-icon";

export default async function DepositSuccessPage() {
	if (!cookies().has("depositsuccess")) {
		notFound();
	}

	const supabase = createClient();
	const user = await getUserWithProfile(supabase);

	if (!user) {
		redirect("/");
	}

	return (
		<section className="w-full flex items-start md:items-center justify-center min-h-[500px] h-[calc(100svh-3.5rem)] md:h-[calc(100svh-5rem)] px-2">
			<div className="flex md:mb-10 max-w-xl w-full flex-col justify-start pt-10 items-center gap-3 text-center">
				<DepositSuccessCheck />
				<h2 className="mt-3">Žetony byly úspěšně vloženy na váš účet</h2>
				<p className="font-light w-2/3 text-gray-400">
					Pokud se vám žetony nepřičetly, zkuste to později znovu!
				</p>

				<div className="py-5">
					<span className="text-lg font-bold text-green-300">
						Tvůj počet žetonů:
					</span>
					<span
						style={{ fontFamily: "var(--font-unbounded)" }}
						className="text-2xl flex items-center justify-start relative gap-2 font-black tracking-wider"
					>
						{formatNumberToCurrency(user.balance)}
						<CoinIcon className="bottom-[1px] w-10 md:h-6 relative" />
					</span>
				</div>
				<Link
					style={{ fontFamily: "var(--font-unbounded)" }}
					className="text-lg uppercase rounded-md px-5 py-2 duration-200 ease-in-out hover:bg-yellow-700 font-bold border-b-[4px] border-l-2 border-r-2 bg-yellow-600 border-yellow-800 tracking-wider"
					href="/hry"
				>
					Jdu hrát
				</Link>
			</div>
		</section>
	);
}
