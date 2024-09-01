import mongoose from "mongoose";

// const clientOptions = {
//   serverApi: { version: "1", strict: true, deprecationErrors: true },
// }

export const connectToDB = async () => {
	try {
		mongoose.connect(process.env.MONGO_DB_URL, {});
		console.log("********Successfully connected to DB");
	} catch (err) {
		console.log("********Error connecting to DB - ", err.message);
	}
};
