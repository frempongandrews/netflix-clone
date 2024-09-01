import axios from "axios";
// import { toast } from "react-toastify"
import {
	GET_CURRENT_USER_SUCCESS,
	GET_CURRENT_USER_ERROR,
	LOGOUT_USER_ERROR,
	LOGOUT_USER_SUCCESS,
} from "../actions/authActions";

export const api = axios.create({
	baseURL: `/api`,
	withCredentials: true,
	timeout: 1000 * 90, // 90 secs
});

export const getCurrentUser = async ({ dispatch, router }) => {
	try {
		const res = await api.get("/current-user");
		console.log("******/current-user - res", res);
		const { user } = res.data;
		dispatch({
			type: GET_CURRENT_USER_SUCCESS,
			user,
		});

		if (!user) {
			router.push("/register");
		}
	} catch (err) {
		console.log("******err", err);
		dispatch({
			type: GET_CURRENT_USER_ERROR,
			message: err?.message || "something went wrong while fetching user",
		});
		router.push("/register");
	}
};

export const logoutUser = async ({ dispatch }) => {
	try {
		const res = await axios.get("/api/logout");
		dispatch({
			type: LOGOUT_USER_SUCCESS,
		});
		//   toast.success(res.data?.message || "logged out", toastOptions)
	} catch (err) {
		// TODO: remove log below
		console.log("*****logoutUser - Error", err);
		dispatch({
			type: LOGOUT_USER_ERROR,
			message: err?.message || "Error during logout",
		});
		//   toast.error(err?.message || "logged out", toastOptions)
	}
};
