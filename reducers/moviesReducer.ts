import {
	ADD_TO_MY_LIST_MOVIES_ERROR,
	ADD_TO_MY_LIST_MOVIES_START,
	ADD_TO_MY_LIST_MOVIES_SUCCESS,
	FETCH_MY_LIST_MOVIES_ERROR,
	FETCH_MY_LIST_MOVIES_START,
	FETCH_MY_LIST_MOVIES_SUCCESS,
} from "../actions/moviesActions";

interface MoviesState {
	myList: any[];
	isLoading: boolean;
	error: string;
}

export const initialState: MoviesState = {
	myList: [],
	isLoading: false,
	error: "",
};

const moviesReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case ADD_TO_MY_LIST_MOVIES_START:
			return {
				...state,
				isLoading: true,
			};

		case ADD_TO_MY_LIST_MOVIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: "",
				myList: [action.movie, ...state.myList],
			};

		case ADD_TO_MY_LIST_MOVIES_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};

		default:
			return state;
	}
};

export default moviesReducer;
