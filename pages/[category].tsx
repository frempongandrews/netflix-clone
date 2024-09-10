import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Header from "../components/Header";
import Row from "../components/Row";
import { requireAuth } from "../components/RequireAuth";
import { ServerResponse } from "http";
import MoviesGrid from "../components/MoviesGrid";
import moviesRequestUrl from "../utils/moviesRequestsUrl";
import { Movie } from "../utils/types";

type MoviesCategoriesUrls = {
	"tv-shows": string;
	trending: string;
	"top-rated": string;
	"my-list": string;
};
export const validMoviesCategoriesUrls: MoviesCategoriesUrls = {
	"tv-shows": "Tv Shows",
	trending: "Trending",
	"top-rated": "Top Rated",
	"my-list": "My List",
};

type Category = keyof MoviesCategoriesUrls;

const CategoryPage = ({ movies }: { movies: Movie[] }) => {
	const router = useRouter();
	const pageUrl = router.asPath.slice(1);
	const categoryPageTitle = (
		validMoviesCategoriesUrls as typeof validMoviesCategoriesUrls
	)[pageUrl as keyof typeof validMoviesCategoriesUrls];
	return (
		<section className="mt-[160px] px-4 lg:px-16">
			<Header showNavigation />

			<MoviesGrid title={categoryPageTitle} movies={movies} />
		</section>
	);
};

const fetchCategoryMovies = async ({
	category,
	page,
}: {
	category: Category;
	page?: number;
}) => {
	let movies = [];
	let moviesUrl = "";
	switch (category) {
		case "tv-shows":
			moviesUrl = moviesRequestUrl.tvShowsUrl;
			break;
		case "trending":
			moviesUrl = moviesRequestUrl.trendingMoviesUrl;
			break;
		case "top-rated":
			moviesUrl = moviesRequestUrl.topRatedMoviesUrl;
			break;

		default:
			return [];
	}

	movies = !page
		? await fetch(moviesUrl).then((res) => res.json())
		: await fetch(moviesUrl + `${"&page="}${page}`).then((res) => res.json());

	return movies.results;
};

// TODO: Fetch category movies
export const getServerSideProps = requireAuth(
	async ({
		res,
		params,
	}: {
		res: ServerResponse;
		params: { category: Category };
	}) => {
		console.log(
			"*******Category getServerSideProps - Params.category",
			params.category
		);

		// validate category
		if (params.category in validMoviesCategoriesUrls) {
			const movies = await fetchCategoryMovies({ category: params.category });
			res.setHeader(
				"Cache-Control",
				"public, s-maxage=86400, stale-while-revalidate=59"
			);
			return {
				props: {
					movies,
				},
			};
		} else {
			return {
				notFound: true,
			};
		}
	}
);

export default CategoryPage;
