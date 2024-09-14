import { FETCH_MY_LIST_MOVIES_START } from "../actions/moviesActions";

const initialState = {
	myList: [],
	isLoading: false,
	error: "",
};

export const moviesReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MY_LIST_MOVIES_START:
	}
};
