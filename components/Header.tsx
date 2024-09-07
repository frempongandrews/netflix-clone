import Link from "next/link";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../components/ui/drawer";

import { useOnClickOutside } from "usehooks-ts";
import { useIsScrolled } from "../hooks/useIsScrolled";
import { logoutUser } from "../lib/api";
import { useAuth } from "../hooks/useAuth";

interface IProps {
	showNavigation?: boolean;
}

const navigationLinks = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Tv Shows",
		href: "/tv-shows",
	},
	{
		label: "Trending",
		href: "/trending",
	},
	{
		label: "Top Rated",
		href: "/top-rated",
	},
	{
		label: "My List",
		href: "/my-list",
	},
];

const Header = ({ showNavigation }: IProps) => {
	const accountMenuRef = useRef(null);
	const [isAccountMenuOpened, setIsAccountMenuOpened] = useState(false);
	const { isScrolled } = useIsScrolled();
	const { dispatch } = useAuth();
	const router = useRouter();

	useEffect(() => {
		console.log("******Router.pathname", router.pathname);
		console.log("******Router", router);

		// TODO: hiding shadcn drawer handle
		// create ref to ul
		// get element before ul
	});

	const renderNavLinks = () => {
		return navigationLinks.map((link) => {
			return (
				<li
					key={link.label}
					className={`header-link ${
						router.asPath === link.href
							? "text-white hover:text-white font-medium"
							: ""
					}`}
				>
					<Link href={link.href} prefetch>
						{link.label}
					</Link>
				</li>
			);
		});
	};

	const handleClickInside = () => {
		setIsAccountMenuOpened(!isAccountMenuOpened);
	};

	const handleClickOutside = () => {
		setIsAccountMenuOpened(false);
	};

	useOnClickOutside(accountMenuRef, handleClickOutside);

	return (
		<header
			className={`${
				isScrolled && "bg-theme-black"
			} fixed top-0 left-0 w-full z-50 flex items-center p-4 lg:p-6 justify-between transition-all duration-[0.4s] px-4 lg:px-16`}
		>
			{/* mobile menu icon */}
			<div className="md:hidden">
				<Drawer direction="left">
					<DrawerTrigger asChild>
						<RxHamburgerMenu size={24} className="cursor-pointer" />
					</DrawerTrigger>
					<DrawerContent className="border-0 fixed -top-[100px] left-0 min-w-[320px] max-w-[320px] w-[60%]">
						<ul
							id="mobile-drawer-nav"
							className="bg-theme-darker-gray text-theme-gray-medium fixed top-0 left-0 w-full z-50 h-full font-light text-sm"
						>
							<li className="flex items-center gap-4 mt-5 px-4 py-6 cursor-pointer hover:text-white transition-all duration-300">
								<img src="/account-image.png" className="w-[40px]" />{" "}
								<span>Tony</span>
							</li>
							<div className="bg-black h-[2px]" />
							<li className="py-4 px-4 cursor-pointer hover:text-white transition-all duration-300">
								Notifications
							</li>
							<div className="bg-black h-[2px]" />
							<li className="py-4 px-4 cursor-pointer hover:text-white transition-all duration-300">
								Manage Profiles
							</li>
							<div className="bg-black h-[2px]" />

							<div className="py-2">
								<li className="py-2 px-4 border-l-4 border-theme-red font-medium text-white cursor-pointer hover:text-white transition-all duration-300">
									Home
								</li>
								<li className="py-2 mt-2 px-4 cursor-pointer hover:text-white transition-all duration-300">
									TV Shows
								</li>
								<li className="py-2 mt-2 px-4 cursor-pointer hover:text-white transition-all duration-300">
									Trending
								</li>
								<li className="py-2 mt-2 px-4 cursor-pointer hover:text-white transition-all duration-300">
									Top Rated
								</li>
								<li className="py-2 mt-2 px-4 cursor-pointer hover:text-white transition-all duration-300">
									My List
								</li>
							</div>
						</ul>
					</DrawerContent>
				</Drawer>
			</div>

			<div className="md:flex !z-50">
				<Link href="/">
					<img
						src="/netflix-logo.svg"
						className="object-contain w-[100px] md:mr-10 cursor-pointer"
					/>
				</Link>

				{showNavigation && (
					<ul className="md:flex space-x-2 hidden items-center">
						{renderNavLinks()}
					</ul>
				)}
			</div>

			{/* account / notifications / search */}
			{showNavigation && (
				<div className="flex space-x-4 items-center">
					<button className="">
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
					{/* notification icon */}
					<button className="hidden md:inline">
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
					<button
						className="relative hidden md:inline"
						ref={accountMenuRef}
						onClick={handleClickInside}
					>
						<span className="">
							{isAccountMenuOpened && (
								<GoTriangleUp
									className="absolute -right-[20px] top-[5px]"
									size={18}
								/>
							)}
							{!isAccountMenuOpened && (
								<GoTriangleDown
									className="absolute -right-[20px] top-[5px]"
									size={18}
								/>
							)}

							<img src="/account-image.png" />
						</span>

						{/* Account menu */}

						<>
							<GoTriangleUp
								className={`${
									!isAccountMenuOpened
										? "opacity-0 pointer-events-none -z-50"
										: "opacity-100"
								} absolute right-[10px] top-[45px] transition-all duration-200`}
								size={20}
							/>
							<ul
								className={`absolute z-50 bg-theme-black text-sm top-[60px] -left-[170px]  w-[200px] text-left border-[1px] border-gray-500 ${
									!isAccountMenuOpened
										? "opacity-0 pointer-events-none -z-50 h-0"
										: "opacity-100"
								}  transition-all duration-200 h-[auto] overflow-hidden`}
							>
								{/* content */}
								<div className="p-[10px]">
									<li className="py-2 hover:underline flex items-center">
										<img
											src="/netflix-avatar-teal.png"
											className="w-8 rounded- mr-3"
										/>
										<span>Chris</span>
									</li>
									<li className="py-2 hover:underline flex items-center">
										<img
											src="/netflix-avatar-red.jpg"
											className="w-8 rounded- mr-3"
										/>
										<span>Sis</span>
									</li>
									<li className="py-2 hover:underline flex items-center">
										<img
											src="/netflix-avatar-yellow.jpg"
											className="w-8 rounded- mr-3"
										/>
										<span>Moonpie</span>
									</li>
									<li className="py-2 hover:underline">
										<span>Manage Profiles</span>
									</li>
								</div>

								{/* divider */}
								<div className="border-gray-500 border-t h-[1px] my-2" />

								{/* account / logout */}
								<li className="px-[10px] py-2 hover:underline">
									<Link href="/account">
										<span>Account</span>
									</Link>
								</li>
								<li
									className="px-[10px] py-2  hover:underline"
									onClick={() => logoutUser({ dispatch, router })}
								>
									<span>Sign out of Netflix</span>
								</li>
							</ul>
						</>
					</button>
				</div>
			)}
		</header>
	);
};

export default Header;
