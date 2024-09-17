const { useContext, useState, useReducer, createContext } = require("react");
import moviesReducer, { initialState } from "../reducers/moviesReducer";

const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(moviesReducer, initialState);

	return (
		<MoviesContext.Provider value={{ state, dispatch }}>
			{children}
		</MoviesContext.Provider>
	);
};

export const useMovies = () => {
	const { state, dispatch } = useContext(MoviesContext);
	return { state, dispatch };
};

export default MoviesContextProvider;
