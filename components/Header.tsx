import Link from "next/link";
import { useIsScrolled } from "../hooks/useIsScrolled";

interface IProps {
	showNavigation?: boolean;
}

const Header = ({ showNavigation }: IProps) => {
	const { isScrolled } = useIsScrolled();

	return (
		<header
			className={`${
				isScrolled && "bg-theme-black"
			} fixed top-0 left-0 w-full z-50 flex items-center p-4 lg:p-6 justify-between transition-all duration-[0.4s]`}
		>
			<div className="flex">
				<Link href="/">
					<img
						src="https://rb.gy/ulxxee"
						className="object-contain w-[100px] mr-10"
					/>
				</Link>

				{showNavigation && (
					<ul className="md:flex space-x-2 hidden items-center">
						<li className="header-link">Home</li>
						<li className="header-link">TV Shows</li>
						<li className="header-link">Movies</li>
						<li className="header-link">New & Popular</li>
						<li className="header-link">My List</li>
					</ul>
				)}
			</div>

			{/* account / notifications / search */}
			{showNavigation && (
				<div className="flex space-x-4 items-center">
					<button className="hidden sm:inline">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							/>
						</svg>
					</button>
					<span className="header-link hidden lg:inline">Kids</span>
					<button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="size-6"
						>
							<path
								fillRule="evenodd"
								d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
					<Link href="/account">
						<img
							src="https://rb.gy/g1pwyx"
							alt=""
							className="cursor-pointer rounded"
						/>
					</Link>
				</div>
			)}
		</header>
	);
};

export default Header;
