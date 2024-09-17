import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { IoCheckmark } from "react-icons/io5";
import { PlusIcon } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useIsScrolled } from "../hooks/useIsScrolled";
import Thumbnail from "./Thumbnail";
import { Genre, Movie } from "../utils/types";
import { fetchMovieVideosData, getMovieTrailerIndex } from "../lib/utils";
import { addMovieToMyList } from "../lib/api";
import { useMovies } from "../hooks/useMovies";
import { Spinner } from "./ui/spinner";

interface IProps {
	movie: Movie | null;
}

const Banner = ({ movie }: IProps) => {
	const [movieTrailer, setMovieTrailer] = useState<string>("");
	const { isScrolled } = useIsScrolled();
	const [isMounted, setIsMounted] = useState(false);
	const [showMovieInfo, setShowMovieInfo] = useState(false);
	const [isTrailerMuted, setIsTrailerMuted] = useState(true);
	const [isTrailerPlaying, setIsTrailerPlaying] = useState(true);
	const [movieGenres, setMovieGenres] = useState<Genre[]>([]);

	const { state, dispatch } = useMovies();

	useEffect(() => {
		setIsMounted(true);

		console.log("**********State", state);

		// component will unmount
		return () => {
			setIsMounted(false);
		};
	}, []);

	useEffect(() => {
		fetchMovieTrailer();
	}, [movie]);

	const fetchMovieTrailer = async () => {
		const data = await fetchMovieVideosData({ movie });

		const movieVideos = data?.videos?.results;

		if (data?.videos) {
			const index = getMovieTrailerIndex({ videos: movieVideos });
			setMovieTrailer(data.videos?.results[index]?.key);
		}

		if (data?.genres) {
			setMovieGenres(data.genres);
		}
	};
	return (
		<div className="flex flex-col py-[160px]">
			<div className="w-[100%] h-[95vh] lg:h-[90vh] absolute top-0 left-0 -z-10">
				{/* <Image
					priority
					src={`${moviesImageBaseUrl}${
						movie?.backdrop_path || movie?.poster_path
					}`}
					// alt={`${movie?.title || movie?.name || movie?.original_name} ${
					// 	movie && "image"
					// }`}
					objectFit="cover"
					layout="fill"
				/> */}
				{isMounted ? (
					<div
						className={`${
							!isScrolled ? "fixed" : "absolute"
						} top-0 left-0 h-[80vh] w-[100%]`}
					>
						{/* TODO: uncomment */}
						{/* <ReactPlayer
							muted={true}
							playing={!showMovieInfo}
							className="absolute top-0 left-0"
							url={`https://www.youtube.com/watch?v=${movieTrailer}`}
							width="100%"
							height="100%"
							loop={true}
						/> */}
					</div>
				) : null}
			</div>
			<div className="mt-[100px] md:mt-[0px]">
				<h1 className="font-bold text-3xl md:text-4xl lg:text-6xl transition-all duration-[0.4s]">
					{movie?.title || movie?.name || movie?.original_name}
				</h1>
				<p className="mt-5 max-w-sm lg:max-w-xl text-sm lg:text-lg transition-all duration-[0.4s] text-shadow-md">
					{movie?.overview}
				</p>
			</div>
			{/* buttons */}
			<div className="mt-5 flex h-[40px]">
				<button className="banner-btn mr-4 text-black bg-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-4 h-4 md:w-6 md:h-6"
					>
						<path
							fillRule="evenodd"
							d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
							clipRule="evenodd"
						/>
					</svg>
					Play
				</button>
				<Dialog
					key={movie?.id}
					onOpenChange={(open) => {
						if (!open) {
							setShowMovieInfo(false);
						}
					}}
				>
					<DialogTrigger asChild>
						<button
							onClick={() => {
								setShowMovieInfo(true);
							}}
							className="banner-btn text-white bg-[#464646]"
						>
							<span>More Info</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="size-6 ml-2"
							>
								<path
									fillRule="evenodd"
									d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</DialogTrigger>
					<DialogContent className="md:max-w-2xl bg-theme-black p-0 border-[0px] overflow-hidden pt-4">
						<DialogTitle className="px-4">
							{movie?.title || movie?.name || movie?.original_name}
						</DialogTitle>
						{/* video player */}
						<div className="relative pt-[56.25%]">
							{/* TODO: uncomment player below */}
							{/* <ReactPlayer
								muted={isTrailerMuted}
								loop={true}
								playing={isTrailerPlaying}
								className="absolute top-0 left-0"
								url={`https://www.youtube.com/watch?v=${movieTrailer}`}
								width="100%"
								height="100%"
							/> */}
						</div>

						{/* controls */}
						<div className="flex px-4 justify-between">
							<div className="flex items-center gap-2 ">
								<Button
									variant="secondary"
									className="flex items-center py-2 px-8"
									onClick={() => setIsTrailerPlaying(!isTrailerPlaying)}
								>
									{isTrailerPlaying && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="size-4 mr-1"
										>
											<path
												fillRule="evenodd"
												d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
												clipRule="evenodd"
											/>
										</svg>
									)}

									{!isTrailerPlaying && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="size-4 mr-1"
										>
											<path
												fillRule="evenodd"
												d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
												clipRule="evenodd"
											/>
										</svg>
									)}

									{!isTrailerPlaying && <span>Play</span>}
									{isTrailerPlaying && <span>Pause</span>}
								</Button>
								<button
									onClick={() => addMovieToMyList({ dispatch, movie })}
									className="block rounded-full p-[2px] transition-all duration-200 hover:text-white"
								>
									<span
										className="border-[1px] border-white rounded-full block p-[2px] hover:bg-white hover:text-black cursor-pointer transition-all duration-200"
										title="Add to My List"
									>
										{state.isLoading && <Spinner className="text-red-700" />}
										{!state.isLoading && <PlusIcon />}
									</span>

									{/* <IoCheckmark size={24} title="Remove from My List" /> */}
								</button>
							</div>

							{/* volume button */}
							<div>
								<button
									className="flex items-center justify-center border-[1px] border-white rounded-full w-[32px] h-[32px] transition-all duration-200 hover:text-black hover:bg-white"
									onClick={() => setIsTrailerMuted(!isTrailerMuted)}
								>
									{isTrailerMuted && (
										<span className="block" title="Mute">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="size-4"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
												/>
											</svg>
										</span>
									)}

									{!isTrailerMuted && (
										<span title="Volume">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												className="size-4"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
												/>
											</svg>
										</span>
									)}
								</button>
							</div>
						</div>
						<h6 className="flex space-x-2 text-xs items-center px-4 mt-2">
							<span className="text-[#57BC44]">69% Match</span>
							<span>{movie?.release_date}</span>
							<span className="border-[1px] border-white px-2 rounded-md text-[10px]">
								HD
							</span>
						</h6>
						{/* content container */}
						<div className="mt-2 px-4 flex flex-wrap items-start pb-8">
							<div className="w-[100%] md:w-[60%] md:mr-4">
								<p className="mt-0 text-xs text-theme-off-white">
									{movie?.overview}
								</p>
							</div>

							<div className="w-[100%] md:w-[30%] mt-4 md:mt-0 text-xs text-theme-off-white flex flex-col gap-1">
								<p>
									<span className="text-theme-dark-gray">Genres: </span>

									{movieGenres.map((genre, i) => (
										<span key={genre.id}>
											{genre.name}
											{i === movieGenres.length - 1 ? " " : ", "}
										</span>
									))}
								</p>
								<p>
									<span className="text-theme-dark-gray">
										Original language:
									</span>{" "}
									<span>{movie?.original_language}</span>
								</p>
								<p>
									<span className="text-theme-dark-gray">Total votes:</span>{" "}
									<span>{movie?.vote_count}</span>
								</p>
							</div>
						</div>
					</DialogContent>
				</Dialog>
				{/* <button className="flex items-center gap-2 py-2 px-6 md:py-3 md:px-8 rounded-sm text-sm font-semibold md:text-xl hover:opacity-75 transition-all duration-[0.4s] bg-[gray]/70">
					More Info{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-4 h-4 md:w-6 md:h-6"
					>
						<path
							fillRule="evenodd"
							d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
							clipRule="evenodd"
						/>
					</svg>
				</button> */}
			</div>
		</div>
	);
};

export default Banner;
