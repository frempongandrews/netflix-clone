import passport from "passport";
import nc from "next-connect";
import User from "../../../../backend/models/User";
import { connectToDB } from "../../../../backend/utils/db";

connectToDB();

const handler = nc();

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
			callbackURL: "/api/auth/google/callback",
		},
		// 2nd
		async (accessToken, refreshToken, profile, cb) => {
			try {
				const existingUser = await User.findOne({
					email: profile._json.email,
					googleId: profile.id,
				});

				if (existingUser === null) {
					const newUser = new User({
						email: profile._json.email,
						googleId: profile.id,
						isVerified: true,
						image:
							profile._json?.picture ||
							"https://cdn-icons-png.flaticon.com/128/1946/1946429.png",
					});
					const savedNewUser = await newUser.save();
					cb(null, savedNewUser);
					return;
				}
				// Adds the "user" object as req.user
				// cb calls the handler at the "callbackURL" (in this case set to
				// "/api/auth/google/callback")
				cb(null, existingUser);
			} catch (err) {
				// first argument is the error.. passing null allows for more
				// flexibility in handling the error flow
				// Adds the second argument (object in this case) as req.user
				cb(null, { errorMessage: err?.message || "Error while logging in" });
			}
		}
	)
);

handler.get(
	passport.authenticate("google", {
		scope: ["email", "profile"],
		session: false,
		failureRedirect: "/",
	})
);

export default handler;
