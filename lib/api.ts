import axios from "axios";
// import { toast } from "react-toastify"
import {
	GET_CURRENT_USER_SUCCESS,
	GET_CURRENT_USER_ERROR,
	LOGOUT_USER_ERROR,
	LOGOUT_USER_SUCCESS,
} from "../actions/authActions";

import {
	ADD_TO_MY_LIST_MOVIES_START,
	ADD_TO_MY_LIST_MOVIES_SUCCESS,
	ADD_TO_MY_LIST_MOVIES_ERROR,
	FETCH_MY_LIST_MOVIES_START,
	FETCH_MY_LIST_MOVIES_SUCCESS,
	FETCH_MY_LIST_MOVIES_ERROR,
} from "../actions/moviesActions";

import moviesRequestUrl from "../utils/moviesRequestsUrl";
import { Category, Movie } from "../utils/types";
import { Dispatch } from "react";

export const api = axios.create({
	baseURL: `/api`,
	withCredentials: true,
	timeout: 1000 * 90, // 90 secs
});

/********** AUTH ************/

export const getCurrentUser = async ({ dispatch }: { dispatch?: any }) => {
	try {
		const res = await api.get("/current-user");
		const { user } = res.data;

		if (dispatch) {
			return dispatch({
				type: GET_CURRENT_USER_SUCCESS,
				user,
			});
		}

		return user;
	} catch (err: any) {
		if (dispatch) {
			return dispatch({
				type: GET_CURRENT_USER_ERROR,
				message: err?.message || "something went wrong while fetching user",
			});
		}

		return err.message;
	}
};

export const logoutUser = async ({
	dispatch,
	router,
}: {
	dispatch?: any;
	router: any;
}) => {
	try {
		const res = await api.post("/logout");
		dispatch({
			type: LOGOUT_USER_SUCCESS,
		});
		router.push("/login");
		//   toast.success(res.data?.message || "logged out", toastOptions)
	} catch (err: any) {
		dispatch({
			type: LOGOUT_USER_ERROR,
			message: err?.message || "Error during logout",
		});
		//   toast.error(err?.message || "logged out", toastOptions)
	}
};

/********** FETCH CATEGORY MOVIES ************/
export const fetchCategoryMovies = async ({
	category,
	page,
}: {
	category: Category;
	page?: number;
}) => {
	let movies: any = {};
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

	return movies;
};

/**********FETCH MY LIST ************/
export const fetchMyList = async ({
	dispatch,
	page,
}: {
	dispatch: any;
	page?: number;
}) => {
	try {
		dispatch({
			type: FETCH_MY_LIST_MOVIES_START,
		});
		const url = `/my-list${page ? "?page=" + page : ""}`;
		console.log("************ fetchMyList URL", url);
		const { data } = await api.get(url);
		const {
			myList,
			myListObj,
			currentPage,
			isLastPage,
			totalItems,
			totalPages,
		} = data;
		console.log("*********fetchMyList data", data);
		dispatch({
			type: FETCH_MY_LIST_MOVIES_SUCCESS,
			myList,
			myListObj,
			currentPage,
			isLastPage,
			totalItems,
			totalPages,
		});
	} catch (err: any) {
		dispatch({
			type: FETCH_MY_LIST_MOVIES_ERROR,
			error:
				err?.response?.data.message ||
				"Something went wrong  while fetching my list",
		});
	}
};

/**********ADD TO MY LIST ************/

export const addMovieToMyList = async ({
	dispatch,
	movie,
}: {
	dispatch: any;
	movie: Movie | null;
}) => {
	// TODO: Add movie to MyList

	dispatch({ type: ADD_TO_MY_LIST_MOVIES_START });
	try {
		const res = await api.post("/my-list", movie);
		dispatch({ type: ADD_TO_MY_LIST_MOVIES_SUCCESS, movie });
	} catch (err: any) {
		dispatch({
			type: ADD_TO_MY_LIST_MOVIES_ERROR,
			error: err?.response?.data.message,
		});
	}
};
