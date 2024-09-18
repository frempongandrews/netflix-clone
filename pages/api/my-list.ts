import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "../../backend/utils/db";
import { getUserFromJwt } from "../../backend/utils";
import User from "../../backend/models/User";

connectToDB();

const useMiddleware = (
	req: NextApiRequest,
	res: NextApiResponse,
	middleware: (
		req: NextApiRequest,
		res: NextApiResponse,
		next: (err?: any) => void
	) => void
) => {
	return new Promise((resolve, reject) => {
		middleware(req, res, (err) => {
			if (err) reject(err);
			resolve(null);
		});
	});
};

interface AuthenticatedApiRequest extends NextApiRequest {
	user?: any;
}

export default async function handler(
	req: AuthenticatedApiRequest,
	res: NextApiResponse
) {
	/*** POST ***/
	if (req.method === "POST") {
		// return res.status(200).json({ message: "All working" });
		try {
			const movie = req.body;
			console.log("*********Movie to Add To My List", movie);

			await useMiddleware(req, res, getUserFromJwt);

			console.log(
				"************/api/my-list handler running - AFTER useMiddleware - req.user",
				req.user
			);

			const user = req?.user;

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			const userWithList = await User.findById(user.id);

			const isAlreadyInMyList = userWithList.myList.some(
				(m: any) => m.id === movie.id
			);

			if (isAlreadyInMyList) {
				res
					.status(409)
					.json({ message: `Movie ${movie.id} is already in my list` });
			}

			const updatedUser = await User.findByIdAndUpdate(
				user.id,
				{ myList: [movie, ...user.myList] },
				{ new: true }
			);
			console.log("*********Updated user", updatedUser);

			res.status(201).json({
				movie,
				message: `Movie ${movie.id} successfully added to My List`,
			});
		} catch (err: any) {
			res.status(400).json({ message: `Error adding movie: ${err.message}` });
		}

		/*** GET ***/
	} else if (req.method === "GET") {
		await useMiddleware(req, res, getUserFromJwt);

		const user = req?.user;

		let currentPage: any = req.query.page;

		currentPage = parseInt(currentPage);

		if (!currentPage || typeof currentPage !== "number") {
			currentPage = 1;
		}

		console.log("*********Req.query", req.query);
		console.log("*********Req.query - page", currentPage);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const foundUser = await User.findById(user.id);

		const pageSize = 10;
		const totalItems = foundUser.myList.length;
		const totalPages = Math.ceil(totalItems / pageSize);

		if (currentPage > totalPages) {
			res.status(400).json({
				message: `Page ${currentPage} does not exist. Total pages: ${totalPages}`,
			});
		}

		let from = (currentPage - 1) * pageSize;
		let to = currentPage * pageSize;

		res.status(200).json({
			currentPage,
			totalItems,
			totalPages,
			isLastPage: currentPage === totalPages,
			myList: foundUser.myList.slice(from, to),
		});
	} else {
		res.status(405).json({ message: `Method ${req.method} is not supported` });
	}
}
