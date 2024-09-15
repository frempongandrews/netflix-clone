import Cookies from "cookies";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import User from "../models/User";
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

export const getUserFromJwt = async (req, res, next) => {
	// extract the jwt

	console.log(
		"************getUserFromJwt running - req.headers.cookie",
		req.headers.cookie
	);

	var reqCookiesObj = cookie.parse(req.headers.cookie);

	const jwtToken = reqCookiesObj["access_token"];

	if (jwtToken === "undefined") {
		next({ error: { message: "Not Authorised" } });
		return;
	}

	try {
		const decoded = jwt.verify(jwtToken, process.env.JWT_TOKEN_SECRET);
		console.log("************getUserFromJwt running - decoded", decoded);
		// get user from token
		const { userId } = decoded;
		const user = await User.findById(userId);
		console.log("************getUserFromJwt running - user", user);
		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
};
