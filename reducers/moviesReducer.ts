import {
	ADD_TO_MY_LIST_MOVIES_ERROR,
	ADD_TO_MY_LIST_MOVIES_START,
	ADD_TO_MY_LIST_MOVIES_SUCCESS,
	FETCH_MY_LIST_MOVIES_ERROR,
	FETCH_MY_LIST_MOVIES_START,
	FETCH_MY_LIST_MOVIES_SUCCESS,
} from "../actions/moviesActions";

export interface MoviesState {
	myList: any[];
	myListObj: { [key: string]: any };
	currentPage: number;
	isLastPage: boolean;
	totalItems: number;
	totalPages: number;
	isLoading: boolean;
	error: string;
}

export const initialState: MoviesState = {
	myList: [],
	myListObj: {},

	currentPage: 1,
	isLastPage: false,
	totalItems: 0,
	totalPages: 0,

	isLoading: false,
	error: "",
};

const moviesReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case ADD_TO_MY_LIST_MOVIES_START:
			return {
				...state,
				isLoading: true,
				error: "",
			};

		case ADD_TO_MY_LIST_MOVIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: "",
				myList: [action.movie, ...state.myList],
				myListObj: { [action.movie.id]: action.movie, ...state.myListObj },
			};

		case ADD_TO_MY_LIST_MOVIES_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.error,
			};

		case FETCH_MY_LIST_MOVIES_START:
			return {
				...state,
				isLoading: true,
				error: "",
			};

		case FETCH_MY_LIST_MOVIES_SUCCESS:
			console.log(
				"**********FETCH_MY_LIST_MOVIES_SUCCESS action.myList",
				action.myList
			);
			console.log(
				"**********FETCH_MY_LIST_MOVIES_SUCCESS state.myList",
				state.myList
			);
			const uniqueMovies = [...state.myList, ...action.myList].filter(
				(movie, index, array) => {
					return array.findIndex((m) => m.id === movie.id) === index;
				}
			);
			return {
				...state,
				isLoading: false,
				error: "",

				myList:
					action.currentPage === 1 ? [...action.myList] : [...uniqueMovies],
				myListObj: action.myListObj,

				currentPage: action.currentPage,
				isLastPage: action.isLastPage,
				totalItems: action.totalItems,
				totalPages: action.totalPages,
			};

		case FETCH_MY_LIST_MOVIES_ERROR:
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
