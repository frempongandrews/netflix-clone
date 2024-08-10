import { Movie } from "../utils/types";
import Thumbnail from "./Thumbnail";

interface IProps {
	title: string;
	movies: Movie[];
}

const Row = ({ title, movies }: IProps) => {
	return (
		<div className="overflow-x-scroll max-w-[100%] scrollbar-hide">
			<h1 className="font-semibold text-sm lg:text-xl text-theme-off-white transition-all duration-200 hover:text-white cursor-pointer w-fit">
				{title}
			</h1>
			<div className="flex h-40 border-2 border-green-700 space-x-2 items-center">
				{movies.map((movie) => {
					return <Thumbnail movie={movie} key={movie.id} />;
				})}
			</div>
		</div>
	);
};

export default Row;
