"use client";

import { motion } from "framer-motion";

const draw = {
	hidden: { pathLength: 0, opacity: 0 },
	visible: (i: number) => {
		const delay = 0.2 + i * 0.5;
		return {
			pathLength: 1.01,
			opacity: 1,
			transition: {
				pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
				opacity: { delay, duration: 0.01 },
			},
		};
	},
};

export default function DepositSuccessCheck() {
	return (
		<div>
			<motion.svg
				width="100"
				height="100"
				viewBox="0 0 100 100"
				initial="hidden"
				animate="visible"
				fill="transparent"
			>
				<motion.circle
					cx="50"
					cy="50"
					r="46"
					strokeWidth="6"
					stroke="#0E9F6E"
					variants={draw}
					custom={1}
				/>
				<motion.line
					x1="25"
					y1="60"
					x2="50"
					y2="73"
					strokeWidth="6"
					stroke="#0E9F6E"
					variants={draw}
					custom={2}
				/>
				<motion.line
					x2="75"
					y2="30"
					x1="47"
					y1="75"
					stroke="#0E9F6E"
					strokeWidth="6"
					variants={draw}
					custom={2}
				/>
			</motion.svg>
		</div>
	);
}
