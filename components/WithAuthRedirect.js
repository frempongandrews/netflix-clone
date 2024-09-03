import { getUserWithToken } from "../lib/utils";
export const withAuthRedirect = (gssp) => {
	return async (context) => {
		const { req } = context;

		const token = req.cookies.access_token;

		const data = await getUserWithToken({ token });
		const user = data.user;
		console.log("******User in withAuthRedirect", user);

		if (user) {
			return {
				redirect: {
					destination: "/",
					statusCode: 302,
				},
			};
		} else {
			return await gssp(context);
		}
	};
};
