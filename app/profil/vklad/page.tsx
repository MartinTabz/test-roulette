import GoBack from "@/components/GoBack";
import DepositInput from "@/components/profile/DepositInput";

export default function DepositPage({
	searchParams,
}: {
	searchParams?: { stav?: "zruseno" };
}) {
	return (
		<section className="w-full h-[calc(100vh-80px)] py-10 px-2 flex items-center justify-center relative">
			<GoBack
				link="/profil"
				text="Zpět na profil"
				className="absolute left-4 top-4"
			/>
			<div className="max-w-5xl h-full w-full pt-10 text-center flex flex-col gap-5 items-center justify-center">
				<div className="mb-5">
					<h2 className="pb-1">Vklad testovacích žetonů</h2>
					<p className="font-light text-xs">
						Prosím vložte kolik žetonů si přejete vložit. Minimální počet je 100
						a maximální počet je 20 000
					</p>
				</div>
				<DepositInput state={searchParams?.stav ?? null} />
				<span className="my-10 text-gray-500 w-full max-w-[350px] text-[0.6rem] font-extralight">
					Toto kasíno slouží pouze jako hobby projekt, žetony se nedají koupit
					za reálné peníze a platební brána je pouze simulováná pomocí
					testovacího režimu.{" "}
					<b className="font-bold">
						Pokud chcete dobít žetony použijte číslo karty 4242 4242 4242 4242,
						jakékoliv datum expirace, které je v budoucnosti a náhodný CVC kód
					</b>
				</span>
			</div>
		</section>
	);
}
