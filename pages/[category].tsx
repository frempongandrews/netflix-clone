import router, { useRouter } from "next/router";
import Header from "../components/Header";
import { requireAuth } from "../components/RequireAuth";
import { ServerResponse } from "http";
import MoviesGrid from "../components/MoviesGrid";
import { Category, Movie, validMoviesCategoriesUrls } from "../utils/types";
import { fetchCategoryMovies, fetchMyList } from "../lib/api";
import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../hooks/useMovies";

const CategoryPage = ({
	movies,
	totalPages,
}: {
	movies: Movie[];
	totalPages: number;
}) => {
	const router = useRouter();
	const category = router.query.category as Category;
	const pageUrl = router.asPath.slice(1);
	const categoryPageTitle = (
		validMoviesCategoriesUrls as typeof validMoviesCategoriesUrls
	)[pageUrl as keyof typeof validMoviesCategoriesUrls];
	const [allMovies, setAllMovies] = useState(movies);
	const [totalNumberOfPages, setTotalNumberOfPages] = useState(totalPages);
	const [currentPage, setCurrentPage] = useState(1);

	const { state, dispatch } = useContext(MoviesContext);

	useEffect(() => {
		setAllMovies(movies);
		setTotalNumberOfPages(totalPages);
	}, [movies]);

	useEffect(() => {
		console.log("**********currentPage", currentPage);
		console.log("**********totalNumberOfPages", totalNumberOfPages);
	}, [allMovies]);

	const fetchNextPage = async () => {
		if (category === "my-list") {
			if (state.isLastPage) {
				return;
			}
			setCurrentPage(currentPage + 1);
			const nextPage = currentPage + 1;
			fetchMyList({ dispatch, page: nextPage });
			return;
		}
		// all other categories
		if (currentPage === totalNumberOfPages) {
			return;
		}
		setCurrentPage(currentPage + 1);
		const nextPage = currentPage + 1;
		const fetchedCategoryMovies = await fetchCategoryMovies({
			category,
			page: nextPage,
		});
		setAllMovies((prev) => [...prev, ...fetchedCategoryMovies.results]);
	};

	return (
		<section className="pt-[160px] px-4 lg:px-16 pb-[100px]">
			{category === "my-list" && (
				<MoviesGrid
					title={categoryPageTitle}
					movies={state.myList}
					category={category}
				/>
			)}
			{category !== "my-list" && (
				<MoviesGrid
					title={categoryPageTitle}
					movies={allMovies}
					category={category}
				/>
			)}

			{/*** My List ***/}
			{category === "my-list" && state.isLastPage && <p>End of your list...</p>}
			{category === "my-list" && !state.isLastPage && (
				<button
					onClick={() => fetchNextPage()}
					className="cursor-pointer bg-black w-fit px-4 py-2 text-sm"
				>
					LOAD MORE
				</button>
			)}

			{/*** All other categories ***/}
			{category !== "my-list" && currentPage !== totalNumberOfPages && (
				<button
					onClick={() => fetchNextPage()}
					className="cursor-pointer bg-black w-fit px-4 py-2 text-sm"
				>
					LOAD MORE
				</button>
			)}

			{category !== "my-list" && currentPage === totalNumberOfPages && (
				<p>End of your {category} list...</p>
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
		if (params.category === "my-list") {
			return {
				props: {
					movies: [],
					totalPages: 0,
				},
			};
		}

		if (params.category in validMoviesCategoriesUrls) {
			const fetchedCategoryMovies = await fetchCategoryMovies({
				category: params.category,
			});

			const movies = fetchedCategoryMovies.results;
			const totalPages = fetchedCategoryMovies.total_pages;

			res.setHeader(
				"Cache-Control",
				"public, s-maxage=86400, stale-while-revalidate=59"
			);
			return {
				props: {
					movies,
					totalPages,
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
