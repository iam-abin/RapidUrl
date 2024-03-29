import mongoose from "mongoose";
import shortid from "shortid";

const urlShortSchema = new mongoose.Schema({
	fullUrl: {
		type: String,
		required: true,
	},
	shortUrl: {
		type: String,
		required: true,
		default: () => shortid.generate(),
	},
	numberOfClicks: {
		type: Number,
		required: true,
		default: 0,
	},
});

const UrlShortModel = mongoose.model("UrlShort", urlShortSchema);
export { UrlShortModel };
