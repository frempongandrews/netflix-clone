import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const usePageTransition = () => {
	const [isPageActive, setIsPageActive] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleStart = () => setIsPageActive(false);
		const handleComplete = () => setIsPageActive(true);

		// Trigger when the page loads the first time
		handleComplete();

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
		};
	}, [router]);

	return isPageActive;
};

export default usePageTransition;
