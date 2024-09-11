import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "../../backend/utils/db";

connectToDB();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// if (req.method === "POST") {
	// 	// Process a POST request
	// 	res.status(200).json({ movie, message: `Movie ${movie.id} successfully added to My List` });
	// } else {
	// 	res.status(405).json({ error: `Method ${req.method} is not supported` });
	// }
}
