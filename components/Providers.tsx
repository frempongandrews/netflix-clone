import NextNProgress from "nextjs-progressbar";

import AuthContextProvider from "../hooks/useAuth";
import MoviesContextProvider from "../hooks/useMovies";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<NextNProgress color="#e50914" />
			<AuthContextProvider>
				<MoviesContextProvider>{children}</MoviesContextProvider>
			</AuthContextProvider>
		</>
	);
};

export default Providers;
