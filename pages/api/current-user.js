import nc from "next-connect";
import { connectToDB } from "../../backend/utils/db";
import { getUserFromJwt } from "../../backend/utils";

connectToDB();

const handler = nc();

handler.use(getUserFromJwt);

handler.get((req, res) => {
	res.json({
		user: req.user?.getUserSummary() || null,
	});
});

export default handler;
