import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";
import AuthContextProvider from "../hooks/useAuth";
import usePageTransition from "../hooks/usePageTransition";
import Header from "../components/Header";
import MoviesContextProvider from "../hooks/useMovies";

function MyApp({ Component, pageProps }: AppProps) {
	const isPageActive = usePageTransition();
	return (
		<>
			<NextNProgress color="#e50914" />
			<AuthContextProvider>
				<MoviesContextProvider>
					<div className={`page ${isPageActive ? "page-active" : ""}`}>
						<Header />
						<Component {...pageProps} />
					</div>
				</MoviesContextProvider>
			</AuthContextProvider>
		</>
	);
}

export default MyApp;
