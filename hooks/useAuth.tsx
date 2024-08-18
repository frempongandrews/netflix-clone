import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

interface IProps {
	children: React.ReactNode;
}

interface IAuthProps {
	email: string;
	password: string;
}

interface IAuthContext {
	user: User | null;
	error: string | null;
	isLoading: boolean;
	loginUser: ({ email, password }: IAuthProps) => Promise<void>;
	registerUser: ({ email, password }: IAuthProps) => Promise<void>;
	logoutUser: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | {}>({});

const AuthContextProvider = ({ children }: IProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
				router.push("/login");
			}
		});
	}, [auth]);

	const loginUser = ({ email, password }: IAuthProps) => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCred) => {
				setUser;
			})
			.catch((err) => {
				setError(err.message);
				setIsLoading(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const registerUser = ({ email, password }: IAuthProps) => {
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCred) => {
				setUser(userCred.user);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setIsLoading(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const logoutUser = () => {
		signOut(auth)
			.then(() => {
				setIsLoading(false);
				router.push("/login");
			})
			.catch((err) => {
				setError(err.message);
				setIsLoading(false);
			});
	};

	const memoedValue = useMemo(
		() => ({ user, isLoading, error, loginUser, registerUser, logoutUser }),
		[user]
	);

	return (
		<AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthContextProvider;
