import Image from "next/image";
import { Movie } from "../utils/types";
import { moviesImageBaseUrl } from "../utils/constants";

interface IProps {
	movie: Movie;
}

const Thumbnail = ({ movie }: IProps) => {
	return (
		<div className="min-w-52 bg-green-600 rounded-md overflow-hidden hover:scale-105 transition-all duration-[0.2s] cursor-pointer">
			<img
				src={`${moviesImageBaseUrl}${
					movie?.backdrop_path || movie?.poster_path
				}`}
				className="w-[100%]"
			/>
		</div>
	);
};

export default Thumbnail;
