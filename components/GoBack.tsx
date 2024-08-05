import { IoIosArrowRoundBack } from "react-icons/io";

export default function GoBack({
	text,
	link,
	query,
	className,
}: {
	text: string;
	link: string;
	query?: string;
	className?: string;
}) {
	return (
		<a
			className={`text-gray-300 font-light flex items-center justify-start gap-[5px] cursor-pointer goback ${className}`}
			href={`${link}${query ? `?${query}` : ""}`}
		>
			<IoIosArrowRoundBack className="relative ease-in-out duration-200 translate-x-0 -translate-y-[1px] hover:translate-x-[-4px] text-xl" />
			{text}
		</a>
	);
}
