import Cookies from "cookies";
import keys from "./keys";
const secret = process.env.SECRET.split("-");

export const setCookie = ({ cookieName, value, cookieMaxAge, req, res }) => {
	const cookies = new Cookies(req, res, { keys: secret });
	cookies.set(cookieName, value, {
		httpOnly: true, // true by default
		maxAge: cookieMaxAge,
		secure: process.env.NODE_ENV === "development" ? false : true,
	});
};

export const clearAuthCookies = ({ req, res }) => {
	const cookies = new Cookies(req, res, { keys: secret });
	const { cookieName } = keys.cookie;
	cookies.set(cookieName, null, { expires: 0 });
	cookies.set(`${cookieName}.sig`, null, { expires: 0 });
};
