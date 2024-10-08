import { useEffect, useState } from "react";
import { requireAuth } from "../components/RequireAuth";
import Header from "../components/Header";
import moviesRequestUrl from "../utils/moviesRequestsUrl";
import { Movie } from "../utils/types";
import Banner from "../components/Banner";
import Row from "../components/Row";
import { ServerResponse } from "http";
import Row1 from "../components/MoviesGrid";
import MoviesGrid from "../components/MoviesGrid";

interface IProps {
	netflixOriginals: Movie[];
	trendingNow: Movie[];
	topRated: Movie[];
	actionMovies: Movie[];
	comedyMovies: Movie[];
	horrorMovies: Movie[];
	romanceMovies: Movie[];
	documentaries: Movie[];
	errorMessage?: string;
}

const HomePage = ({
	netflixOriginals,
	trendingNow,
	topRated,
	actionMovies,
	comedyMovies,
	horrorMovies,
	romanceMovies,
	documentaries,
	errorMessage,
}: IProps) => {
	const [movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {
		// random movie
		const movie =
			netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)];
		setMovie(movie);

		// TODO: remove from localstorage
		localStorage.setItem("trendingNow", JSON.stringify(trendingNow));
	}, []);

	if (errorMessage) {
		return <p>An Error Occurred: {errorMessage}</p>;
	}

	return (
		<div className="">
			{/* content */}

			<main className="pl-4 lg:pl-16 pb-28">
				{/* banner */}
				<Banner movie={movie} />

				{/* rows */}
				<section className="flex flex-col gap-10 transition-all duration-200 mt-[-100px]">
					<Row title="Trending Now" movies={trendingNow} />
					<Row title="Top Rated" movies={topRated} />
					<Row title="Action Movies" movies={actionMovies} />
					<Row title="Comedy Movies" movies={comedyMovies} />
					<Row title="Horror Movies" movies={horrorMovies} />
					<Row title="Romance Movies" movies={romanceMovies} />
					<Row title="Documentaries" movies={documentaries} />
				</section>
			</main>
		</div>
	);
};

export const getServerSideProps = requireAuth(
	async ({ res }: { res: ServerResponse }) => {
		try {
			const [
				netflixOriginals,
				trendingNow,
				topRated,
				actionMovies,
				comedyMovies,
				horrorMovies,
				romanceMovies,
				documentaries,
			] = await Promise.all([
				fetch(moviesRequestUrl.netflixOriginalsUrl).then((res) => res.json()),
				fetch(moviesRequestUrl.trendingMoviesUrl).then((res) => res.json()),
				fetch(moviesRequestUrl.topRatedMoviesUrl).then((res) => res.json()),
				fetch(moviesRequestUrl.actionMoviesUrl).then((res) => res.json()),
				fetch(moviesRequestUrl.comedyMoviesUrl).then((res) => res.json()),
				fetch(moviesRequestUrl.horrorMoviesUrl).then((res) => res.json()),
				fetch(moviesRequestUrl.romanceMoviesUrl).then((res) => res.json()),
				fetch(moviesRequestUrl.documentariesUrl).then((res) => res.json()),
			]);

			// Set Cache-Control headers for 24 hours
			res.setHeader(
				"Cache-Control",
				"public, s-maxage=86400, stale-while-revalidate=59"
			);

			return {
				props: {
					netflixOriginals: netflixOriginals.results,
					trendingNow: trendingNow.results,
					topRated: topRated.results,
					actionMovies: actionMovies.results,
					comedyMovies: comedyMovies.results,
					horrorMovies: horrorMovies.results,
					romanceMovies: romanceMovies.results,
					documentaries: documentaries.results,
				},
			};
		} catch (error: any) {
			return {
				props: {
					errorMessage: error.message,
					netflixOriginals: [],
					trendingNow: [],
					topRated: [],
					actionMovies: [],
					comedyMovies: [],
					horrorMovies: [],
					romanceMovies: [],
					documentaries: [],
				},
			};
		}
	}
);

export default HomePage;
