import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import keys from "../utils/keys";

const UserSchema = new mongoose.Schema({
	googleId: {
		type: String,
		default: "",
	},
	username: {
		type: String,
		default: "",
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		default: "",
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	image: {
		type: String,
		default: "https://cdn-icons-png.flaticon.com/128/1946/1946429.png",
	},
	emailVerificationCode: {
		type: String,
		default: "",
	},
	// quick implementation for myList
	// TODO: implement it properly by creating Movie model and relation with User model
	myList: {
		type: [mongoose.Schema.Types.Mixed],
		default: [],
	},
});

// sets "createdAt" and "updatedAt" fields
UserSchema.set("timestamps", true);

UserSchema.methods.generateJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_TOKEN_SECRET, {
		expiresIn: keys.jwtTokenExpiry,
	});
};

UserSchema.methods.getUserSummary = function () {
	// don't return the password
	return {
		username: this.username,
		email: this.email,
		isVerified: this.isVerified,
		image: this.image,
	};
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
