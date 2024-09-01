import nc from "next-connect";
// import { connectToDB } from "../../../backend/utils/db";
// import { clearAuthCookies } from "../../../backend/utils";
import { NextApiRequest, NextApiResponse } from "next";

// connectToDB();

// const handler = nc();

// handler.post((req, res) => {
// 	console.log("******logout route");
// 	//   return
// 	//   const cookies = new Cookies(req, res, { keys: process.env.SECRET })
// 	//   console.log("*****cookies")
// 	//   const { cookieName } = keys.cookie
// 	//   cookies.set(cookieName)
// 	//   cookies.set(`${cookieName}.sig`)
// 	clearAuthCookies({ req, res });
// 	res.json({
// 		message: "successfully logged out",
// 	});
// });

// export default handler;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		// Process a POST request
		console.log("*******Rannnnn");
		res.status(200).json({ message: "Hello from Next.js!" });
	} else {
		// Handle any other HTTP method
	}
}
