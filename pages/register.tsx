import { FcGoogle } from "react-icons/fc";
import Header from "../components/Header";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { withAuthRedirect } from "../components/WithAuthRedirect";
import { NextPageContext } from "next";

type AuthInputs = {
	email: string;
	password: string;
};

const RegisterPage = () => {
	const { handleSubmit, register, formState } = useForm<AuthInputs>();
	const { errors } = formState;
	const router = useRouter();

	useEffect(() => {
		console.log("*******FormState", formState.errors);
	});

	const onGoogleSignUp = () => {
		router.push("/api/auth/google");
	};

	const onSignUpUser: SubmitHandler<AuthInputs> = (data) => {
		console.log("******Data", data);
		const { email, password } = data;
		// TODO
	};

	return (
		<div className="h-[100vh]">
			<Header showNavigation={false} />
			<div className="flex h-[100%] md:items-center pt-[100px] p-4 lg:p-6">
				{/* TODO: Add custom registration for email and password and uncomment form below */}
				{/* form */}
				<form
					className="w-[100%] md:max-w-sm mx-auto h-fit md:p-[20px] md:bg-black/75 !z-100"
					onSubmit={handleSubmit(onSignUpUser)}
				>
					<h1 className="font-semibold text-2xl">Sign Up</h1>
					{/* <div className="mt-4">
						<input
							type="text"
							autoComplete="off"
							className={`w-full h-[56px] text-sm px-2 bg-[#333] outline-none ring-transparent focus:outline-none focus:ring-2 ring-2 focus:ring-white rounded-sm transition-all duration-200 ${
								errors.email && errors.email.message
									? "outline-2 outline-theme-red"
									: ""
							}`}
							placeholder="Email address"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /@/,
									message: "Please enter a valid email address.",
								},
							})}
						/>
						{errors.email && (
							<p className="text-xs mt-1 text-theme-red">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="size-6 inline relative mr-[2px]"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								<span className="inline-block relative">
									{errors.email.message}
								</span>
							</p>
						)}
					</div>
					<div className="mt-4 rounded-sm">
						<input
							type="password"
							className={`w-full h-[56px] text-sm px-2 bg-[#333] outline-none ring-transparent focus:outline-none focus:ring-2 ring-2 focus:ring-white rounded-sm transition-all duration-200 ${
								errors.password && errors.password.message
									? "outline-2 outline-theme-red"
									: ""
							}`}
							placeholder="Password"
							{...register("password", {
								required: "Password is required.",
								minLength: {
									value: 4,
									message:
										"Your password must contain between 4 and 60 characters.",
								},
								maxLength: {
									value: 60,
									message:
										"Your password must contain between 4 and 60 characters.",
								},
							})}
						/>
						{errors.password && (
							<p className="text-xs mt-1 text-theme-red flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="size-6 inline relative md:top-[2px] mr-[2px]"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
								<span className="inline-block relative -bottom-[2px]">
									{errors.password.message}
								</span>
							</p>
						)}
					</div>
					<div className="mt-8">
						<button className="w-full outline-none bg-theme-red h-[40px] rounded-sm text-sm font-semibold focus:outline-none hover:opacity-90 transition-all duration-200">
							Sign In
						</button>
					</div>
					<div className="mt-8">
						<p className="text-sm">
							<span className="text-gray-400">New to Netlflix? </span>
							

							<button
								type="button"
								className="text-white hover:underline cursor-pointer"
								onClick={handleSubmit(onRegisterUser)}
							>
								Sign up now
							</button>
						</p>
					</div> */}

					<div className="mt-8">
						<button
							className="flex items-center w-full outline-none bg-theme-red h-[40px] rounded-sm text-sm font-semibold focus:outline-none hover:opacity-90 transition-all duration-200"
							onClick={onGoogleSignUp}
						>
							<FcGoogle className="w-[40px] h-[20px]" />
							<span className="flex-1">Sign up with Google </span>
						</button>
					</div>
					<div className="mt-8">
						<p className="text-sm">
							<span className="text-gray-400">Already have an account? </span>

							<button
								type="button"
								className="text-white hover:underline cursor-pointer"
								onClick={() => {
									router.push("/login");
								}}
							>
								Log in here
							</button>
						</p>
					</div>
				</form>
				{/* end form */}
			</div>

			{/* <Image
				layout="fill"
				objectFit="cover"
				alt="Netflix image"
				src={`https://rb.gy/p2hphi`}
				className="-z-10 hidden md:inline fixed top-0 left-0"
			/> */}

			<img
				src={`https://rb.gy/p2hphi`}
				className="-z-10 hidden md:inline fixed top-0 left-0 w-[100%] h-[100%] object-cover"
			/>
		</div>
	);
};

export const getServerSideProps = withAuthRedirect(
	(context: NextPageContext) => {
		return {
			props: {},
		};
	}
);

export default RegisterPage;
