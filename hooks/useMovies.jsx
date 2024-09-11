const { useContext, useState } = require("react");

const MoviesContext = useContext(null);

const MoviesContextProvider = () => {
	const [myList, setMyList] = useState([]);
	const [trending, setTrending] = useState([]);
	return <MoviesContext.Provider></MoviesContext.Provider>;
};

export const useMovies = () => {
	const {} = useContext(MoviesContext);
};

export default MoviesContextProvider;
