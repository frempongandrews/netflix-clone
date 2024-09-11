import nc from "next-connect";
import passport from "passport";
import { setCookie } from "../../../../backend/utils/index";
import { connectToDB } from "../../../../backend/utils/db";

import keys from "../../../../backend/utils/keys";

connectToDB();

const handler = nc();

// 3rd
handler.get(
	passport.authenticate("google", { failureRedirect: "/auth", session: false }),
	function (req, res) {
		const user = req.user;
		if (user.errorMessage) {
			res.redirect("/login");
			return;
		}

		const jwt = user.generateJWT();
		const { cookieName, cookieMaxAge } = keys.cookie;
		setCookie({ cookieName, cookieMaxAge, value: jwt, req, res });
		res.redirect("/");
	}
);

export default handler;
