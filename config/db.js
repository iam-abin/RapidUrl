import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("connected to mongodb...");
	} catch (error) {
		console.error("mongodb connection failed!!!!");
		throw new Error(error);
	}
};

export { connectDB };
