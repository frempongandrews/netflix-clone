import nc from "next-connect";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import User from "../../backend/models/User";
import keys from "../../backend/utils/keys";
import { connectToDB } from "../../backend/utils/db";

connectToDB();

const secret = process.env.SECRET.split("-");

const handler = nc();

const getUserFromJwt = async (req, res, next) => {
	// TODO: remove log below
	// console.log("*****some middleware");
	const cookies = new Cookies(req, res, { keys: secret });
	const jwtToken = cookies.get(keys.cookie.cookieName, {
		signed: true,
	});

	// TODO: remove log below
	console.log("**********jwtToken", jwtToken);
	try {
		const decoded = jwt.verify(jwtToken, process.env.JWT_TOKEN_SECRET);
		console.log("******decoded", decoded);
		// get user from token
		const { userId } = decoded;
		req.user = await User.findById(userId);
		next();
	} catch (err) {
		// TODO: remove log below
		console.log("*****Jwt Error json", JSON.stringify(err));
		console.log("*****req.user in error block", req.user);
		req.user = null;
		next();
	}
};

handler.use(getUserFromJwt);

handler.get((req, res) => {
	console.log("********/api/current-user running");
	res.json({
		user: req.user?.getUserSummary() || null,
	});
});

export default handler;
