import Image from "next/image";
import { Movie } from "../utils/types";
import { moviesImageBaseUrl } from "../utils/constants";

interface IProps {
	movie: Movie | null;
}

const Banner = ({ movie }: IProps) => {
	return (
		<div className="flex flex-col py-[160px]">
			<div className="w-[100%] h-[95vh] lg:h-[85vh] absolute top-0 left-0 -z-10">
				<Image
					priority
					src={`${moviesImageBaseUrl}${
						movie?.backdrop_path || movie?.poster_path
					}`}
					alt={`${movie?.title || movie?.name || movie?.original_name} image`}
					objectFit="cover"
					fill
				/>
			</div>
			<div>
				<h1 className="font-bold text-3xl md:text-4xl lg:text-6xl transition-all duration-[0.4s]">
					{movie?.title || movie?.name || movie?.original_name}
				</h1>
				<p className="mt-5 max-w-sm lg:max-w-xl text-sm lg:text-lg transition-all duration-[0.4s] text-shadow-md">
					{movie?.overview}
				</p>
			</div>
			{/* buttons */}
			<div className="mt-5 flex">
				<button className="banner-button mr-4 text-black bg-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-4 h-4 md:w-6 md:h-6"
					>
						<path
							fill-rule="evenodd"
							d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
							clip-rule="evenodd"
						/>
					</svg>
					Play
				</button>
				<button className="banner-button bg-[gray]/70">
					More Info{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-4 h-4 md:w-6 md:h-6"
					>
						<path
							fill-rule="evenodd"
							d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Banner;
