const {
	useContext,
	useState,
	useReducer,
	createContext,
	useEffect,
} = require("react");
import { fetchMyList } from "../lib/api";
import moviesReducer, { initialState } from "../reducers/moviesReducer";

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(moviesReducer, initialState);

	useEffect(() => {
		fetchMyList({ dispatch });
	}, []);

	useEffect(() => {
		console.log("*******Movies State", state);
	});

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
