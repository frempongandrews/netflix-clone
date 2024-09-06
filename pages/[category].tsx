import { useEffect, useState } from "react";
import Header from "../components/Header";
import Row from "../components/Row";
import { requireAuth } from "../components/RequireAuth";
import { ServerResponse } from "http";
import MoviesGrid from "../components/MoviesGrid";

const CategoryPage = (props: any) => {
	const [trendingNow, setTrendingNow] = useState([]);

	const getTrendingNow = () => {
		// JSON.parse(localStorage.getItem("trendingNow")) ?? []
		const trendingNowStr = localStorage.getItem("trendingNow");
		if (trendingNowStr) {
			const trendingNowArr = JSON.parse(trendingNowStr);
			setTrendingNow(trendingNowArr);
			return;
		}
		setTrendingNow([]);
	};
	useEffect(() => {
		getTrendingNow();
		console.log("******Category page props", props);
	}, []);
	return (
		<section className="mt-[160px] px-4 lg:px-16">
			<Header showNavigation />

			<MoviesGrid title="Trending Now" movies={trendingNow} />
		</section>
	);
};

// TODO: Fetch category movies
export const getServerSideProps = requireAuth(
	async ({ res, params }: { res: ServerResponse; params: any }) => {
		console.log("*******Category getServerSideProps - Params", params);

		try {
			// const [
			// 	netflixOriginals,
			// 	trendingNow,
			// 	topRated,
			// 	actionMovies,
			// 	comedyMovies,
			// 	horrorMovies,
			// 	romanceMovies,
			// 	documentaries,
			// ] = await Promise.all([
			// 	fetch(moviesRequestUrl.netflixOriginalsUrl).then((res) => res.json()),
			// 	fetch(moviesRequestUrl.trendingMoviesUrl).then((res) => res.json()),
			// 	fetch(moviesRequestUrl.topRatedMoviesUrl).then((res) => res.json()),
			// 	fetch(moviesRequestUrl.actionMoviesUrl).then((res) => res.json()),
			// 	fetch(moviesRequestUrl.comedyMoviesUrl).then((res) => res.json()),
			// 	fetch(moviesRequestUrl.horrorMoviesUrl).then((res) => res.json()),
			// 	fetch(moviesRequestUrl.romanceMoviesUrl).then((res) => res.json()),
			// 	fetch(moviesRequestUrl.documentariesUrl).then((res) => res.json()),
			// ]);

			// Set Cache-Control headers for 24 hours
			// res.setHeader(
			// 	"Cache-Control",
			// 	"public, s-maxage=86400, stale-while-revalidate=59"
			// );

			return {
				props: {
					// netflixOriginals: netflixOriginals.results,
					// trendingNow: trendingNow.results,
					// topRated: topRated.results,
					// actionMovies: actionMovies.results,
					// comedyMovies: comedyMovies.results,
					// horrorMovies: horrorMovies.results,
					// romanceMovies: romanceMovies.results,
					// documentaries: documentaries.results,
				},
			};
		} catch (error: any) {
			return {
				props: {
					errorMessage: error.message,
					movies: [],
				},
			};
		}
	}
);

export default CategoryPage;
