import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("connected to mongodb...");
	} catch (error) {
		console.error(error);
		throw new Error("mongodb connection failed!!!!");
	}
};

export { connectDB };
