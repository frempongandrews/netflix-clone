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
		// @@ Req Body:
		// movie

		try {
			const movie = req.body;

			await useMiddleware(req, res, getUserFromJwt);

			const user = req?.user;

			if (!user) {
				return res.status(404).json({ message: "User not found" });
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
				{
					myList: [movie, ...user.myList],
					myListObj: { [movie.id]: movie, ...user.myListObj },
				},
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
		// @@ Query Params:
		// params are mutually exclusive - if client asks if movie is in "my-list"
		// only that info will be returned as it has nothing to do with pagination

		// movie: string - id of the movie
		// page: string - current page

		await useMiddleware(req, res, getUserFromJwt);

		const user = req?.user;

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		let currentPage: any = req.query.page;

		let movieId = req.query.movie as string; // movie id to check if movie is in my list

		if (movieId) {
			const isMovieOnMyList = Boolean(user.myListObj[movieId]);
			console.log(
				`********* Is this movie ${movieId} on my list?`,
				isMovieOnMyList
			);
			res.status(200).json({
				isMovieOnMyList,
				myList: user.myList,
				myListObj: user.myListObj,
			});
			return;
		}

		currentPage = parseInt(currentPage);

		if (!currentPage || typeof currentPage !== "number") {
			currentPage = 1;
		}

		console.log("*********Req.query", req.query);
		console.log("*********Req.query - page", currentPage);

		const foundUser = await User.findById(user.id);

		const pageSize = 10;
		const totalItems = foundUser.myList.length;
		const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / pageSize);

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
			myListObj: foundUser.myListObj,
		});
	} else {
		res.status(405).json({ message: `Method ${req.method} is not supported` });
	}
}
