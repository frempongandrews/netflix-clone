import { getUserWithToken } from "../lib/utils";

export function requireAuth(gssp) {
	return async (context) => {
		const { req } = context;

		const token = req.cookies.access_token;

		if (!token) {
			// Redirect to login page if no token
			return {
				redirect: {
					destination: "/login",
					statusCode: 302,
				},
			};
		}

		try {
			const data = await getUserWithToken({ token });
			const user = data.user;

			// If user is valid, continue to `getServerSideProps` logic
			if (user) {
				return await gssp(context);
			} else {
				// Redirect to login page if user is not valid
				return {
					redirect: {
						destination: "/login",
						statusCode: 302,
					},
				};
			}
		} catch (error) {
			console.error("Error fetching user: ", error);
			// Redirect to login page if there's an error fetching user
			return {
				redirect: {
					destination: "/login",
					statusCode: 302,
				},
			};
		}
	};
}
