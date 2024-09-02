export function requireAuth(gssp) {
	return async (context) => {
		const { req, res } = context;

		console.log("*******REQ in RequireAuth", req.pathname);

		const token = req.cookies.access_token;

		console.log("*******Token in requireAuth", token);

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
			// Fetch user data from your API
			const BASE_URL =
				process.env.NODE_ENV === "development"
					? process.env.NEXT_PUBLIC_DEV_APP_URL
					: process.env.NEXT_PUBLIC_PROD_APP_URL;
			console.log(
				"******process.env.NODE_ENV in requireAuth",
				process.env.NODE_ENV
			);
			const response = await fetch(`${BASE_URL}/api/current-user`, {
				headers: {
					Cookie: `access_token=${token}`,
				},
			});
			const data = await response.json();
			const user = data.user;
			console.log("******User in requireAuth", user);
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
