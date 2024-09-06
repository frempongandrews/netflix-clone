import "../styles/globals.css";
import AuthContextProvider from "../hooks/useAuth";
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
