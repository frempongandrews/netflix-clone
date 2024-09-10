import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Genre, Movie } from "../utils/types";
import Thumbnail from "./Thumbnail";
import { PlusIcon } from "lucide-react";
import { fetchMovieVideosData, getMovieTrailerIndex } from "../lib/utils";

interface IProps {
	title: string;
	movies: Movie[];
}

const MoviesGrid = ({ title, movies }: IProps) => {
	const [isRowScrolled, setIsRowScrolled] = useState(false);
	const [isTrailerMuted, setIsTrailerMuted] = useState(true);
	const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const [selectedMovieTrailer, setSelectedMovieTrailer] = useState<string | "">(
		""
	);
	const [selectedMovieGenres, setSelectedMovieGenres] = useState<Genre[]>([]);

	const rowRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (selectedMovie) {
			fetchMovieTrailer();
		}
	}, [selectedMovie]);

	const fetchMovieTrailer = async () => {
		const data = await fetchMovieVideosData({ movie: selectedMovie });

		const movieVideos = data.videos.results;

		if (data?.videos) {
			const index = getMovieTrailerIndex({ videos: movieVideos });
			setSelectedMovieTrailer(data.videos?.results[index]?.key);
		}
		if (data?.genres) {
			setSelectedMovieGenres(data.genres);
		}
	};

	return (
		<>
			<h1 className="font-semibold text-sm mb-3 lg:text-xl text-theme-off-white transition-all duration-200 hover:text-white cursor-pointer w-fit">
				{title}
			</h1>
			<div
				className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-20 h-40 scrollbar-hide"
				ref={rowRef}
				style={{ height: "auto", paddingBottom: 80 }}
			>
				{movies.map((movie) => {
					// return <Thumbnail movie={movie} key={movie.id} />;
					return (
						<Dialog
							key={movie.id}
							onOpenChange={(open) => {
								if (!open) {
									setSelectedMovie(null);
									setSelectedMovieTrailer("");
								}
							}}
						>
							<DialogTrigger asChild key={movie.id}>
								<Button
									onClick={() => {
										setSelectedMovie(movie);
									}}
									key={movie.id}
									className="block relative h-28 md:h-36 rounded-sm md:rounded-md overflow-hidden hover:scale-105 transition-all duration-[0.2s] cursor-pointer"
								>
									<Thumbnail movie={movie} key={movie.id} />
								</Button>
							</DialogTrigger>

							<DialogContent className="md:max-w-2xl bg-theme-black p-0 border-[0px] overflow-hidden pt-4">
								<DialogTitle className="px-4">
									{selectedMovie?.title || selectedMovie?.name}
								</DialogTitle>

								{/* video player */}
								{/* TODO: uncomment ReactPlayer below */}
								<div className="relative pt-[56.25%]">
									{/* <ReactPlayer
										muted={isTrailerMuted}
										loop={true}
										playing={isTrailerPlaying}
										className="absolute top-0 left-0"
										url={`https://www.youtube.com/watch?v=${selectedMovieTrailer}`}
										width="100%"
										height="100%"
									/> */}
								</div>

								{/* controls */}
								<div className="flex px-4 justify-between">
									<div className="flex items-center gap-4">
										<Button
											variant="secondary"
											className="flex items-center py-2 px-8"
										>
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
											<span>Play</span>
										</Button>
										<button className="block border-[1px] border-white rounded-full p-[2px] transition-all duration-200 hover:text-black hover:bg-white">
											<PlusIcon />
										</button>
									</div>

									{/* volume button */}
									<div>
										<button
											className="flex items-center justify-center border-[1px] border-white rounded-full w-[32px] h-[32px] transition-all duration-200 hover:text-black hover:bg-white"
											onClick={() => setIsTrailerMuted(!isTrailerMuted)}
										>
											{isTrailerMuted && (
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
											)}

											{!isTrailerMuted && (
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
											)}
										</button>
									</div>
								</div>
								<h6 className="flex space-x-2 text-xs items-center px-4 mt-2">
									<span className="text-[#57BC44]">
										{selectedMovie?.vote_average &&
											Math.round(selectedMovie?.vote_average * 10)}
										% Match
									</span>
									<span>{selectedMovie?.release_date}</span>
									<span className="border-[1px] border-white px-2 rounded-md text-[10px]">
										HD
									</span>
								</h6>
								{/* content container */}
								<div className="mt-2 px-4 flex flex-wrap items-start pb-8">
									<div className="w-[100%] md:w-[60%] md:mr-4">
										<p className="mt-0 text-xs text-theme-off-white">
											{selectedMovie?.overview}
										</p>
									</div>

									<div className="w-[100%] md:w-[30%] mt-4 md:mt-0 text-xs text-theme-off-white flex flex-col gap-1">
										<p>
											<span className="text-theme-dark-gray">Genres: </span>

											{selectedMovieGenres.map((genre, i) => (
												<span key={genre.id}>
													{genre.name}
													{i === selectedMovieGenres.length - 1 ? " " : ", "}
												</span>
											))}
										</p>
										<p>
											<span className="text-theme-dark-gray">
												Original language:
											</span>{" "}
											<span>{selectedMovie?.original_language}</span>
										</p>
										<p>
											<span className="text-theme-dark-gray">Total votes:</span>{" "}
											<span>{selectedMovie?.vote_count}</span>
										</p>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					);
				})}
			</div>
		</>
	);
};

export default MoviesGrid;

//======================================================================

// import { useEffect, useRef, useState } from "react";
// import ReactPlayer from "react-player/lazy";
// import { Button } from "./ui/button";
// import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
// import { Genre, Movie } from "../utils/types";
// import Thumbnail from "./Thumbnail";
// import { PlusIcon } from "lucide-react";
// import { fetchMovieVideosData, getMovieTrailerIndex } from "../lib/utils";

// interface IProps {
// 	title: string;
// 	movies: Movie[];
// }

// const MoviesGrid = ({ title, movies }: IProps) => {
// 	const [isTrailerMuted, setIsTrailerMuted] = useState(true);
// 	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
// 	const [selectedMovieTrailer, setSelectedMovieTrailer] = useState<string | "">(
// 		""
// 	);
// 	const [selectedMovieGenres, setSelectedMovieGenres] = useState<Genre[]>([]);
// 	const [containerHeight, setContainerHeight] = useState<number>(0);

// 	const gridRef = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		if (selectedMovie) {
// 			fetchMovieTrailer();
// 		}
// 	}, [selectedMovie]);

// 	const fetchMovieTrailer = async () => {
// 		const data = await fetchMovieVideosData({ movie: selectedMovie });
// 		const movieVideos = data.videos.results;
// 		if (data?.videos) {
// 			const index = getMovieTrailerIndex({ videos: movieVideos });
// 			setSelectedMovieTrailer(data.videos?.results[index]?.key);
// 		}
// 		if (data?.genres) {
// 			setSelectedMovieGenres(data.genres);
// 		}
// 	};

// 	useEffect(() => {
// 		const updateContainerHeight = () => {
// 			if (gridRef.current) {
// 				const grid = gridRef.current;
// 				const lastChild = grid.lastElementChild;
// 				if (lastChild) {
// 					const bottom = lastChild.getBoundingClientRect().bottom;
// 					const gridBottom = grid.getBoundingClientRect().bottom;
// 					const difference = bottom - gridBottom;
// 					setContainerHeight(grid.clientHeight + difference + 200); // adding some padding
// 				}
// 			}
// 		};

// 		updateContainerHeight();
// 		window.addEventListener("resize", updateContainerHeight);

// 		return () => {
// 			window.removeEventListener("resize", updateContainerHeight);
// 		};
// 	}, [movies]);

// 	return (
// 		<>
// 			<h1 className="font-semibold text-sm mb-3 lg:text-xl text-theme-off-white transition-all duration-200 hover:text-white cursor-pointer w-fit">
// 				{title}
// 			</h1>
// 			<div
// 				className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-20 scrollbar-hide"
// 				style={{ height: "auto", paddingBottom: 80 }}
// 				ref={gridRef}
// 			>
// 				{movies.map((movie) => (
// 					<Dialog
// 						key={movie.id}
// 						onOpenChange={(open) => {
// 							if (!open) {
// 								setSelectedMovie(null);
// 								setSelectedMovieTrailer("");
// 							}
// 						}}
// 					>
// 						<DialogTrigger asChild>
// 							<Button
// 								onClick={() => {
// 									setSelectedMovie(movie);
// 								}}
// 								className="block relative h-28 md:h-36 rounded-sm md:rounded-md overflow-hidden hover:scale-105 transition-all duration-[0.2s] cursor-pointer"
// 							>
// 								<Thumbnail movie={movie} />
// 							</Button>
// 						</DialogTrigger>
// 						<DialogContent className="md:max-w-2xl bg-theme-black p-0 border-[0px] overflow-hidden pt-4">
// 							<DialogTitle className="px-4">
// 								{selectedMovie?.title || selectedMovie?.name}
// 							</DialogTitle>
// 							<div className="relative pt-[56.25%]">
// 								{/* <ReactPlayer
//                   muted={isTrailerMuted}
//                   loop={true}
//                   playing
//                   className="absolute top-0 left-0"
//                   url={`https://www.youtube.com/watch?v=${selectedMovieTrailer}`}
//                   width="100%"
//                   height="100%"
//                 /> */}
// 							</div>
// 							<div className="flex px-4 justify-between">
// 								<div className="flex items-center gap-2">
// 									<Button
// 										variant="secondary"
// 										className="flex items-center py-2 px-8"
// 									>
// 										<svg
// 											xmlns="http://www.w3.org/2000/svg"
// 											viewBox="0 0 24 24"
// 											fill="currentColor"
// 											className="size-4 mr-1"
// 										>
// 											<path
// 												fillRule="evenodd"
// 												d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
// 												clipRule="evenodd"
// 											/>
// 										</svg>
// 										<span>Play</span>
// 									</Button>
// 									<button className="block border-[1px] border-white rounded-full p-[2px] transition-all duration-200 hover:text-black hover:bg-white">
// 										<PlusIcon />
// 									</button>
// 									<button className="flex items-center justify-center border-[1px] border-white rounded-full w-[32px] h-[32px] transition-all duration-200 hover:text-black hover:bg-white">
// 										<svg
// 											xmlns="http://www.w3.org/2000/svg"
// 											fill="none"
// 											viewBox="0 0 24 24"
// 											strokeWidth="1.5"
// 											stroke="currentColor"
// 											className="size-4"
// 										>
// 											<path
// 												strokeLinecap="round"
// 												strokeLinejoin="round"
// 												d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
// 											/>
// 										</svg>
// 									</button>
// 								</div>
// 								<div>
// 									<button
// 										className="flex items-center justify-center border-[1px] border-white rounded-full w-[32px] h-[32px] transition-all duration-200 hover:text-black hover:bg-white"
// 										onClick={() => setIsTrailerMuted(!isTrailerMuted)}
// 									>
// 										{isTrailerMuted ? (
// 											<svg
// 												xmlns="http://www.w3.org/2000/svg"
// 												fill="none"
// 												viewBox="0 0 24 24"
// 												strokeWidth="1.5"
// 												stroke="currentColor"
// 												className="size-4"
// 											>
// 												<path
// 													strokeLinecap="round"
// 													strokeLinejoin="round"
// 													d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
// 												/>
// 											</svg>
// 										) : (
// 											<svg
// 												xmlns="http://www.w3.org/2000/svg"
// 												fill="none"
// 												viewBox="0 0 24 24"
// 												strokeWidth="1.5"
// 												stroke="currentColor"
// 												className="size-4"
// 											>
// 												<path
// 													strokeLinecap="round"
// 													strokeLinejoin="round"
// 													d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
// 												/>
// 											</svg>
// 										)}
// 									</button>
// 								</div>
// 							</div>
// 							<h6 className="flex space-x-2 text-xs items-center px-4 mt-2">
// 								<span className="text-[#57BC44]">
// 									{selectedMovie?.vote_average &&
// 										Math.round(selectedMovie?.vote_average * 10)}
// 									% Match
// 								</span>
// 								<span>{selectedMovie?.release_date}</span>
// 								<span className="border-[1px] border-white px-2 rounded-md text-[10px]">
// 									HD
// 								</span>
// 							</h6>
// 							<div className="mt-2 px-4 flex flex-wrap items-start pb-8">
// 								<div className="w-[100%] md:w-[60%] md:mr-4">
// 									<p className="mt-0 text-xs text-theme-off-white">
// 										{selectedMovie?.overview}
// 									</p>
// 								</div>
// 								<div className="w-[100%] md:w-[30%] mt-4 md:mt-0 text-xs text-theme-off-white flex flex-col gap-1">
// 									<p>
// 										<span className="text-theme-dark-gray">Genres: </span>
// 										{selectedMovieGenres.map((genre, i) => (
// 											<span key={genre.id}>
// 												{genre.name}
// 												{i === selectedMovieGenres.length - 1 ? " " : ", "}
// 											</span>
// 										))}
// 									</p>
// 									<p>
// 										<span className="text-theme-dark-gray">
// 											Original language:
// 										</span>
// 										<span>{selectedMovie?.original_language}</span>
// 									</p>
// 									<p>
// 										<span className="text-theme-dark-gray">Total votes:</span>
// 										<span>{selectedMovie?.vote_count}</span>
// 									</p>
// 								</div>
// 							</div>
// 						</DialogContent>
// 					</Dialog>
// 				))}
// 			</div>
// 		</>
// 	);
// };

// export default MoviesGrid;
