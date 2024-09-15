import axios from "axios";
// import { toast } from "react-toastify"
import {
	GET_CURRENT_USER_SUCCESS,
	GET_CURRENT_USER_ERROR,
	LOGOUT_USER_ERROR,
	LOGOUT_USER_SUCCESS,
} from "../actions/authActions";
import moviesRequestUrl from "../utils/moviesRequestsUrl";
import { Category } from "../utils/types";

export const api = axios.create({
	baseURL: `/api`,
	withCredentials: true,
	timeout: 1000 * 90, // 90 secs
});

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
		console.log("******err", err.message);
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
		const res = await axios.post("/api/logout");
		dispatch({
			type: LOGOUT_USER_SUCCESS,
		});
		router.push("/login");
		//   toast.success(res.data?.message || "logged out", toastOptions)
	} catch (err: any) {
		// TODO: remove log below
		console.log("*****logoutUser - Error", err);
		dispatch({
			type: LOGOUT_USER_ERROR,
			message: err?.message || "Error during logout",
		});
		//   toast.error(err?.message || "logged out", toastOptions)
	}
};

export const fetchCategoryMovies = async ({
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

export const addMovieToMyList = async () => {
	// TODO: Add movie to MyList
	try {
		const res = await api.post("/my-list", {
			id: "123",
			title: "test movie",
		});
		console.log("********addMovieToMyList - res", res);
	} catch (err) {
		console.log("**********addMovieToMyList - err", err);
	}
};

export const fetchMyList = async () => {
	// TODO: fetch MyList
};
