import Header from "../components/Header";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
