import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Movie, Video } from "../utils/types";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const fetchMovieVideosData = async ({
	movie,
}: {
	movie: Movie | null;
}) => {
	if (movie === null) {
		return [];
	}

	const { data } = await axios.get(
		`https://api.themoviedb.org/3/${
			movie?.media_type === "tv" ? "tv" : "movie"
		}/${movie?.id}?api_key=${
			process.env.NEXT_PUBLIC_MOVIES_API_KEY
		}&language=en-US&append_to_response=videos`
	);

	return data;
};

export const getMovieTrailerIndex = ({ videos }: { videos: Video[] }) => {
	const index = videos.findIndex((video: Video) => video.type === "Trailer");

	return index;
};

export const getUserWithToken = async ({ token }: { token: string }) => {
	const BASE_URL =
		process.env.NODE_ENV === "development"
			? process.env.NEXT_PUBLIC_DEV_APP_URL
			: process.env.NEXT_PUBLIC_PROD_APP_URL;

	try {
		const response = await fetch(`${BASE_URL}/api/current-user`, {
			headers: {
				Cookie: `access_token=${token}`,
			},
		});
		const data = await response.json();

		return data;
	} catch (err: any) {
		return err.message;
	}
};
