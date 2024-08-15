import { useEffect, useRef, useState } from "react";
import { Movie } from "../utils/types";
import Thumbnail from "./Thumbnail";

interface IProps {
	title: string;
	movies: Movie[];
}

const Row = ({ title, movies }: IProps) => {
	const [isRowScrolled, setIsRowScrolled] = useState(false);

	const rowRef = useRef<HTMLDivElement>(null);

	const handleMoviesScroll = (direction: string) => {
		setIsRowScrolled(true);

		if (rowRef.current) {
			const { clientWidth, scrollLeft } = rowRef.current;
			const scrollTo =
				direction === "left"
					? scrollLeft - clientWidth
					: scrollLeft + clientWidth;

			rowRef.current?.scrollTo({ left: scrollTo, behavior: "smooth" });
		}
	};

	return (
		<div className="relative group">
			{/* left arrow */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className={`size-6 absolute left-2 top-[55%] z-40 cursor-pointer transition-all duration-500 opacity-0 hover:scale-125 ${
					isRowScrolled && "group-hover:opacity-100"
				} `}
				onClick={() => handleMoviesScroll("left")}
			>
				<path
					fill-rule="evenodd"
					d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
					clip-rule="evenodd"
				/>
			</svg>

			{/* right arrow */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="size-6 absolute right-2 top-[55%] z-50 cursor-pointer transition-all duration-500 group-hover:opacity-100 opacity-0 hover:scale-125"
				onClick={() => handleMoviesScroll("right")}
			>
				<path
					fillRule="evenodd"
					d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
					clipRule="evenodd"
				/>
			</svg>

			<h1 className="font-semibold text-sm lg:text-xl text-theme-off-white transition-all duration-200 hover:text-white cursor-pointer w-fit">
				{title}
			</h1>
			<div
				className="flex h-40 space-x-2 items-center overflow-x-scroll scrollbar-hide"
				ref={rowRef}
			>
				{movies.map((movie) => {
					return <Thumbnail movie={movie} key={movie.id} />;
				})}
			</div>
		</div>
	);
};

export default Row;
