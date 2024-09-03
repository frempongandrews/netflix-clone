import nc from "next-connect";
import jwt from "jsonwebtoken";
import User from "../../backend/models/User";
import { connectToDB } from "../../backend/utils/db";

connectToDB();

const handler = nc();

const getUserFromJwt = async (req, res, next) => {
	// TODO: remove log below
	// console.log("*****some middleware");
	console.log("***** Request Headers:", req.headers);

	// extract the jwt
	const jwtToken = req.headers.cookie.split("access_token=")[1];
	try {
		const decoded = jwt.verify(jwtToken, process.env.JWT_TOKEN_SECRET);
		// get user from token
		const { userId } = decoded;
		req.user = await User.findById(userId);
		next();
	} catch (err) {
		next(err);
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
