import Link from "next/link";

export default function NotFoundComponent() {
	return (
		<section className="w-full flex items-center justify-center h-[calc(100svh-3.5rem)] md:h-[calc(100svh-5rem)] min-h-[400px]">
			<div className="flex mb-20 sm:mb-0 text-center items-center justify-center flex-col max-w-[400px] gap-2">
				<h1 className="sm:text-9xl text-7xl leading-none">404</h1>
				<span className="mb-3 font-medium text-green-300">
					Stránka, kterou hledáte neexistuje :/
				</span>
				<Link
					style={{ fontFamily: "var(--font-unbounded)" }}
					className="text-lg w-fit uppercase rounded-md px-5 py-2 duration-200 ease-in-out hover:bg-yellow-700 font-bold border-b-[4px] border-l-2 border-r-2 bg-yellow-600 border-yellow-800 tracking-wider"
					href="/hry"
				>
					Na hry
				</Link>
			</div>
		</section>
	);
}
