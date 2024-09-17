import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";
import AuthContextProvider from "../hooks/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<NextNProgress color="#e50914" />
			<AuthContextProvider>
				<Component {...pageProps} />
			</AuthContextProvider>
		</>
	);
}

export default MyApp;
