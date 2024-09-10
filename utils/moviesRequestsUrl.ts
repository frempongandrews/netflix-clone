const MOVIES_API_KEY = process.env.NEXT_PUBLIC_MOVIES_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const moviesRequestUrl = {
	trendingMoviesUrl: `${BASE_URL}/trending/all/week?api_key=${MOVIES_API_KEY}&language=en-US`,
	netflixOriginalsUrl: `${BASE_URL}/discover/movie?api_key=${MOVIES_API_KEY}&with_networks=213`,
	topRatedMoviesUrl: `${BASE_URL}/movie/top_rated?api_key=${MOVIES_API_KEY}&language=en-US`,
	actionMoviesUrl: `${BASE_URL}/discover/movie?api_key=${MOVIES_API_KEY}&language=en-US&with_genres=28`,
	comedyMoviesUrl: `${BASE_URL}/discover/movie?api_key=${MOVIES_API_KEY}&language=en-US&with_genres=35`,
	horrorMoviesUrl: `${BASE_URL}/discover/movie?api_key=${MOVIES_API_KEY}&language=en-US&with_genres=27`,
	romanceMoviesUrl: `${BASE_URL}/discover/movie?api_key=${MOVIES_API_KEY}&language=en-US&with_genres=10749`,
	documentariesUrl: `${BASE_URL}/discover/movie?api_key=${MOVIES_API_KEY}&language=en-US&with_genres=99`,
	tvShowsUrl: `${BASE_URL}/discover/tv?api_key=${MOVIES_API_KEY}&include_adult=false&include_null_first_air_dates=false&language=en-US`,
};

export default moviesRequestUrl;
