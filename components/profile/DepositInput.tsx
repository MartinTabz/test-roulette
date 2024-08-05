"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CoinIcon from "@/public/coin-icon";
import { Button } from "../ui/button";
import { FiLoader } from "react-icons/fi";
import { useNotifications } from "@/utils/contexts/NotificationContext";

export default function DepositInput({ state }: { state: "zruseno" | null }) {
	const router = useRouter();
	const { newError } = useNotifications();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [amount, setAmout] = useState<number>(100);

	useEffect(() => {
		if (state == "zruseno") {
			newError("Nákup žetonů byl zrušen");
		}
	}, []);

	const handleDeposit = async () => {
		if (amount < 100 || amount > 20000) {
			newError("Počet musí být v rozmezí 100 - 20 000");
			return;
		}
		setIsLoading(true);
		try {
			const { data } = await axios.get(
				`/api/profile/deposit?amount=${amount.toString()}`
			);
			if (data.url) {
				router.push(data.url);
			} else {
				newError("Něco se pokazilo. Zkuste to znovu později");
			}
		} catch (error: any) {
			newError(error.response.data.error);
		}
		setIsLoading(false);
	};

	return (
		<div className="flex w-full flex-col gap-5 max-w-full sm:max-w-[300px]">
			<div className="border-2 w-full py-1 px-2 gap-3 border-green-950 bg-background flex items-center justify-center rounded-md">
				<CoinIcon />
				<input
					className="bg-background h-[1.125rem] w-[calc(100%-32px)] p-0 text-lg focus:outline-none focus:border-none"
					type="text"
					value={amount}
					onChange={(e) => {
						const value = e.target.value.replace(/[^0-9]/g, "");
						if (Number(value) <= 20000) {
							setAmout(Number(value));
						}
					}}
				/>
			</div>
			<Button
				onClick={handleDeposit}
				disabled={isLoading}
				className="bg-green-500 text-base hover:bg-green-900 text-white"
			>
				{isLoading ? <FiLoader className="text-lg animate-spin" /> : "Vložit"}
			</Button>
		</div>
	);
}
