import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

interface IProps {
	children: React.ReactNode;
}

export const AppContextProvider = ({ children }: IProps) => {
	const [isMovieModalVisible, setIsMovieModalVisible] = useState(false);

	return (
		<AppContext.Provider
			value={{ isMovieModalVisible, setIsMovieModalVisible }}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = () => {
	return useContext(AppContext);
};

export default AppContextProvider;
