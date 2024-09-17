import router, { useRouter } from "next/router";
import Header from "../components/Header";
import { requireAuth } from "../components/RequireAuth";
import { ServerResponse } from "http";
import MoviesGrid from "../components/MoviesGrid";
import { Category, Movie, validMoviesCategoriesUrls } from "../utils/types";
import { fetchCategoryMovies } from "../lib/api";
import { useEffect, useState } from "react";

const CategoryPage = ({
	movies,
	myList,
}: {
	movies: Movie[];
	myList: Movie[];
}) => {
	const router = useRouter();
	const category = router.query.category as Category;
	const pageUrl = router.asPath.slice(1);
	const categoryPageTitle = (
		validMoviesCategoriesUrls as typeof validMoviesCategoriesUrls
	)[pageUrl as keyof typeof validMoviesCategoriesUrls];

	const [allMovies, setAllMovies] = useState<Movie[]>([]);

	useEffect(() => {
		setAllMovies(movies);
	}, []);

	return (
		<section className="pt-[160px] px-4 lg:px-16">
			{category === "my-list" && (
				<MoviesGrid title={categoryPageTitle} movies={movies} />
			)}
			{category !== "my-list" && (
				<MoviesGrid title={categoryPageTitle} movies={allMovies} />
			)}
		</section>
	);
};

export const getServerSideProps = requireAuth(
	async ({
		res,
		params,
	}: {
		res: ServerResponse;
		params: { category: Category };
	}) => {
		// validate category

		if (params.category in validMoviesCategoriesUrls) {
			let myList: Movie[] = [];
			let movies = [];

			if (params.category === "my-list") {
				// TODO: fetch myList
				myList = [];
			} else {
				movies = await fetchCategoryMovies({ category: params.category });
			}

			res.setHeader(
				"Cache-Control",
				"public, s-maxage=86400, stale-while-revalidate=59"
			);
			return {
				props: {
					movies,
					myList,
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
