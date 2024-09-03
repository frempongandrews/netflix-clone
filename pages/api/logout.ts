import { connectToDB } from "../../backend/utils/db";
import { clearAuthCookies } from "../../backend/utils";
import { NextApiRequest, NextApiResponse } from "next";

connectToDB();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		// Process a POST request

		clearAuthCookies({ req, res });
		res.status(200).json({ message: "Successfully logged out" });
	} else {
		res.status(405).json({ error: `Method ${req.method} is not supported` });
	}
}
