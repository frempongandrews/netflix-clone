import {
	ADD_TO_MY_LIST_MOVIES_ERROR,
	ADD_TO_MY_LIST_MOVIES_START,
	ADD_TO_MY_LIST_MOVIES_SUCCESS,
	FETCH_MY_LIST_MOVIES_ERROR,
	FETCH_MY_LIST_MOVIES_START,
	FETCH_MY_LIST_MOVIES_SUCCESS,
	REMOVE_FROM_MY_LIST_MOVIES_START,
	REMOVE_FROM_MY_LIST_MOVIES_SUCCESS,
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
		// Add to my list
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

		// Fetch my list
		case FETCH_MY_LIST_MOVIES_START:
			return {
				...state,
				isLoading: true,
				error: "",
			};

		case FETCH_MY_LIST_MOVIES_SUCCESS:
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

		// Remove from my list
		case REMOVE_FROM_MY_LIST_MOVIES_START:
			return {
				...state,
				isLoading: true,
				error: "",
			};

		case REMOVE_FROM_MY_LIST_MOVIES_SUCCESS:
			const myListObjCopy = { ...state.myListObj };
			delete myListObjCopy[action.movie.id];
			return {
				...state,

				isLoading: false,
				error: "",

				myList: state.myList.filter((m) => m.id !== action.movie.id),
				myListObj: { ...myListObjCopy },
			};

		default:
			return state;
	}
};

export default moviesReducer;
