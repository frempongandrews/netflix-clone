import mongoose from "mongoose";

export const connectToDB = async () => {
	try {
		mongoose.connect(process.env.MONGO_DB_URL, {});
		console.log("********Successfully connected to DB");
	} catch (err) {
		console.log("********Error connecting to DB - ", err.message);
	}
};
