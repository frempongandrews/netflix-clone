import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { useIsScrolled } from "../hooks/useIsScrolled";
import { logoutUser } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IProps {
	showNavigation?: boolean;
}

const Header = ({ showNavigation }: IProps) => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);

		// component will unmount
		return () => {
			setIsMounted(false);
		};
	}, []);
	const { isScrolled } = useIsScrolled();
	const { dispatch } = useAuth();
	const router = useRouter();

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
					<button onClick={() => {}} className="relative">
						<img src="/account-image.png" />
						<ul className="absolute z-50 bg-theme-black text-sm top-[40px] -left-[170px]  w-[200px] text-left border-[1px] border-gray-500">
							{/* content */}
							<div className="p-[10px]">
								<li className="py-2 hover:underline">
									<span>Manage Profiles</span>
								</li>
								<li className="py-2 hover:underline">
									<span>Account</span>
								</li>
							</div>

							{/* logout */}
							<li className="text-center py-2 border-gray-500 border-t hover:underline">
								<span>Sign out of Netflix</span>
							</li>
						</ul>
					</button>
				</div>
			)}
		</header>
	);
};

export default Header;
