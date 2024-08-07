"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { formatNumberToCurrency } from "@/utils/client-functions";
import Image from "next/image";
import LogOutButton from "./LogOutButton";
import CoinIcon from "@/public/coin-icon";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export default function NavigationPanel({
	username,
	avatarUrl,
	balance,
}: {
	username: string;
	avatarUrl: string;
	balance: number;
}) {
	const [sheetOpened, setSheetOpened] = useState<boolean>(false);
	return (
		<>
			<span
				style={{ fontFamily: "var(--font-unbounded)" }}
				className="text-lg mt-5 md:mt-0 flex items-center md:text-[1.1rem] justify-start relative gap-1 font-black tracking-wider"
			>
				{formatNumberToCurrency(balance)}
				<CoinIcon className="bottom-[1px] w-8 md:h-6 relative" />
			</span>
			<Sheet open={sheetOpened} onOpenChange={setSheetOpened}>
				<SheetTrigger className="w-full">
					<div className="w-full flex items-center justify-between rounded-md bg-green-950 md:bg-transparent md:justify-end md:gap-5 py-[6px] px-2">
						<div className="flex items-center gap-2">
							<Avatar>
								<AvatarImage src={avatarUrl} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<span className="text-base font-medium tracking-wider">
								{username}
							</span>
						</div>
						<FaChevronDown className="rotate-90" />
					</div>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Profil</SheetTitle>
						<div className="flex flex-col gap-0 items-center sm:items-start">
							<Image
								src={avatarUrl}
								className="rounded-md"
								width={100}
								height={100}
								alt=""
							/>
							<span className="text-xl mt-4 sm:mb-1 leading-none font-bold tracking-wider">
								{username}
							</span>
							<span
								style={{ fontFamily: "var(--font-unbounded)" }}
								className="text-base flex items-center sm:mb-1 md:text-[1.1rem] justify-start relative gap-1 font-black tracking-wider"
							>
								{formatNumberToCurrency(balance)}
								<CoinIcon className="bottom-[1px] w-8 md:h-6 relative" />
							</span>
							<Link
								onClick={() => setSheetOpened(false)}
								className="bg-green-600 mb-2 mt-1 w-full text-base uppercase h-11 rounded-md flex items-center justify-center tracking-wider font-bold hover:bg-green-900 text-white duration-200 ease-in-out"
								href={"/profil/vklad"}
							>
								Vložit žetony
							</Link>
							<Link
								className="text-base py-1 font-medium tracking-wider"
								href={"/profil"}
								onClick={() => setSheetOpened(false)}
							>
								Nastavení
							</Link>
							<Link
								className="text-base py-1 mb-2 font-medium tracking-wider"
								href={"/profil/historie"}
								onClick={() => setSheetOpened(false)}
							>
								Historie
							</Link>

							<div className="absolute bottom-0 left-0 w-full p-5">
								<LogOutButton />
							</div>
						</div>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</>
	);
}
