import rouletteImg from "@/public/ruleta.jpg";
import plinkoImg from "@/public/plinko.jpg";
import diceImg from "@/public/kostky.jpg";
import Image from "next/image";

export default function GamesPage() {
	return (
		<section className="flex items-center justify-center w-full px-2 h-auto md:h-[calc(100svh-5rem)]">
			<div className="w-full max-w-[350px] xl:max-w-5xl grid grid-cols-1 gap-3 md:grid-cols-3 md:max-w-3xl md:gap-3 xl:gap-4">
				<a className="w-full relative h-auto duration-200 ease-in-out hover:opacity-75 md:hover:-translate-y-5" href="/">
					<Image
						src={rouletteImg}
						className="rounded-xl w-full h-full relative"
						width={408}
						height={546}
						alt="Banner pro hru ruleta"
					/>
				</a>
				<a className="w-full relative h-auto duration-200 ease-in-out hover:opacity-75 md:hover:-translate-y-5" href="/hry/plinko">
					<Image
						src={plinkoImg}
						className="rounded-xl w-full h-full relative"
						width={408}
						height={546}
						alt="Banner pro hru plinko"
					/>
				</a>
				<a className="w-full relative h-auto duration-200 ease-in-out hover:opacity-75 md:hover:-translate-y-5" href="/hry/kostky">
					<Image
						src={diceImg}
						className="rounded-xl w-full h-full relative"
						width={408}
						height={546}
						alt="Banner pro hru kostky"
					/>
				</a>
			</div>
		</section>
	);
}
