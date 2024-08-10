import { Movie } from "../utils/types";
import Thumbnail from "./Thumbnail";

interface IProps {
	title: string;
	movies: Movie[];
}

const Row = ({ title, movies }: IProps) => {
	return (
		<div>
			<h1 className="font- text-sm text-theme-off-white transition-all duration-[0.4s] hover:text-white cursor-pointer w-fit">
				{title}
			</h1>
			<div className="flex h-[140px] border-2 border-green-700 space-x-2 items-center">
				{movies.map((movie) => {
					return <Thumbnail movie={movie} key={movie.id} />;
				})}
			</div>
		</div>
	);
};

export default Row;
