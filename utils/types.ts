export interface Genre {
	id: number;
	name: string;
}

export interface Movie {
	title: string;
	backdrop_path: string;
	media_type?: string;
	release_date?: string;
	first_air_date: string;
	genre_ids: number[];
	id: number;
	name: string;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	vote_count: number;
}

export interface Element {
	type:
		| "Bloopers"
		| "Featurette"
		| "Behind the Scenes"
		| "Clip"
		| "Trailer"
		| "Teaser";
}

export interface Video {
	name: string;
	id: string;
	type:
		| "Bloopers"
		| "Featurette"
		| "Behind the Scenes"
		| "Clip"
		| "Trailer"
		| "Teaser";
	key: string;
}

export type MoviesCategoriesUrls = {
	"tv-shows": string;
	trending: string;
	"top-rated": string;
	"my-list": string;
};
export const validMoviesCategoriesUrls: MoviesCategoriesUrls = {
	"tv-shows": "Tv Shows",
	trending: "Trending",
	"top-rated": "Top Rated",
	"my-list": "My List",
};

export type Category = keyof MoviesCategoriesUrls;
