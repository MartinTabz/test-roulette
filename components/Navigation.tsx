"use client";

import { useState } from "react";
import DiscordSignInButton from "./auth/DiscordSignInButton";
import NavigationPanel from "./auth/NavigationPanel";

type GetUserWithProfile = {
	loggedIn: boolean;
	balance: number;
	username: string;
	avatarUrl: string;
};

export default function Navigation({
	user,
}: {
	user: GetUserWithProfile | null;
}) {
	const [isMenuOpened, setMenuOpened] = useState<boolean>(false);
	return (
		<header className="w-full relative flex items-center justify-center h-14 md:h-20 md:bg-[#030704] px-3">
			<div className="absolute w-full h-full left-0 top-0 z-40 bg-background md:bg-[#030704]"></div>
			<div className="flex justify-between items-center w-full max-w-5xl z-50">
				<div className="flex items-center gap-20">
					<div className="flex items-center gap-3">
						<h1 className="text-xl">
							<a href="/">Supnex</a>
						</h1>
						<a
							className="hidden md:block underline text-gray-400 text-xs font-bold"
							href="/informace-o-kasinu"
						>
							Info zde
						</a>
					</div>
					<nav className="hidden md:block">
						<a
							style={{ fontFamily: "var(--font-unbounded)" }}
							className="text-lg uppercase rounded-md px-5 py-2 duration-200 ease-in-out hover:bg-yellow-700 font-bold border-b-[4px] border-l-2 border-r-2 bg-yellow-600 border-yellow-800 tracking-wider"
							href="/hry"
						>
							Hry
						</a>
					</nav>
				</div>
				<div
					onClick={() => setMenuOpened(!isMenuOpened)}
					className="flex flex-col md:hidden gap-[5px] relative cursor-pointer"
				>
					<div
						className={`w-6 h-[2px] bg-white relative duration-200 ease-in-out ${
							isMenuOpened ? "-rotate-45 translate-y-[0.42rem]" : ""
						}`}
					></div>
					<div
						className={`w-6 h-[2px] bg-white relative duration-200 ease-in-out ${
							isMenuOpened ? "translate-x-1 opacity-0" : "opacity-100"
						}`}
					></div>
					<div
						className={`w-6 h-[2px] bg-white relative duration-200 ease-in-out ${
							isMenuOpened ? "rotate-45 -translate-y-[0.42rem]" : ""
						}`}
					></div>
				</div>
				<div className="hidden md:flex md:items-center md:gap-5">
					{user ? <NavigationPanel {...user} /> : <DiscordSignInButton />}
				</div>
			</div>
			<div
				className={`w-full h-auto pointer-events-none block md:hidden duration-200 ease-in-out p-2 pt-0 z-30 absolute ${
					isMenuOpened ? "top-14" : "-top-96"
				} w-full h-28`}
			>
				<div className="border-2 border-green-950 bg-background rounded-md p-5 flex pointer-events-auto flex-col gap-4 justify-center items-center">
					<a
						onClick={() => setMenuOpened(false)}
						className="text-base font-medium tracking-wider"
						href={"/"}
					>
						Domů
					</a>
					<a
						onClick={() => setMenuOpened(false)}
						className="text-base font-medium tracking-wider"
						href={"/"}
					>
						Všechny hry
					</a>
					{user ? <NavigationPanel {...user} /> : <DiscordSignInButton />}
				</div>
			</div>
		</header>
	);
}
