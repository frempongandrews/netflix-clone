import { createContext, useContext, useEffect, useReducer } from "react";
import authReducer, { initialState } from "../reducers/authReducer";
import { getCurrentUser } from "../lib/api";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	useEffect(() => {
		getCurrentUser({ dispatch });
	}, []);
	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const { state, dispatch } = useContext(AuthContext);

	return { state, dispatch };
};

export default AuthContextProvider;
