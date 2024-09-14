const { useContext, useState } = require("react");

const MoviesContext = useContext(null);

const MoviesContextProvider = ({ children }) => {
	const [myList, setMyList] = useState([]);

	return <MoviesContext.Provider>{children}</MoviesContext.Provider>;
};

export const useMovies = () => {
	const {} = useContext(MoviesContext);
};

export default MoviesContextProvider;
