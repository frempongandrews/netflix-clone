import { NextRequest } from "next/server";
import AuthContextProvider from "../hooks/useAuth";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<AuthContextProvider>
				<Component {...pageProps} />
			</AuthContextProvider>
		</>
	);
}

export default MyApp;
