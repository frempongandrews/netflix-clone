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
