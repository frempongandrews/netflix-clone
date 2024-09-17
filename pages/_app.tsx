import type { AppProps } from "next/app";

import "../styles/globals.css";
import usePageTransition from "../hooks/usePageTransition";
import Header from "../components/Header";
import Providers from "../components/Providers";

function MyApp({ Component, pageProps }: AppProps) {
	const isPageActive = usePageTransition();
	return (
		<Providers>
			<div className={`page ${isPageActive ? "page-active" : ""}`}>
				<Header />
				<Component {...pageProps} />
			</div>
		</Providers>
	);
}

export default MyApp;
