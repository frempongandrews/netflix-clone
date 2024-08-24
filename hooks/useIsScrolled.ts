import { useState, useEffect } from "react";

export const useIsScrolled = () => {
	const [isScrolled, setIsScrolled] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		// componentWillUnmount
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return { isScrolled };
};
