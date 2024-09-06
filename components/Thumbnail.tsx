import Image from "next/image";
import { Movie } from "../utils/types";
import { Button } from "./ui/button";

interface IProps {
	movie: Movie | null;
}

const Thumbnail = ({ movie }: IProps) => {
	return (
		// <div className="relative min-w-52 h-28 md:h-36 md:min-w-[260px] rounded-sm md:rounded-md overflow-hidden hover:scale-105 transition-all duration-[0.2s] cursor-pointer">

		// 	<Image
		// 		src={`https://image.tmdb.org/t/p/w500${
		// 			movie.backdrop_path || movie.poster_path
		// 		}`}
		// 		className="object-cover rounded-sm md:rounded-md"
		// 		layout="fill"
		// 		alt={`${movie?.title || movie?.name || movie?.original_name} image`}
		// 	/>
		// </div>
		<div className="w-[100%]">
			<Image
				src={`https://image.tmdb.org/t/p/w500${
					movie?.backdrop_path || movie?.poster_path
				}`}
				className="object-cover rounded-sm md:rounded-md"
				layout="fill"
				alt={`${movie?.title || movie?.name || movie?.original_name} image`}
			/>
		</div>
	);
};

export default Thumbnail;
