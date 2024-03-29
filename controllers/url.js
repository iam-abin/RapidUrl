import { UrlShortModel } from "../model/urlShort.js";

export const showHomePage = async (req, res) => {
	const urls = await UrlShortModel.find();
	res.render("index", { urls });
};

export const createShortUrl = async (req, res) => {
	await UrlShortModel.create({
		fullUrl: req.body.fullUrl,
	});
	res.redirect("/");
};

export const goToShortUrl = async (req, res) => {
	const result = await UrlShortModel.findOne({
		shortUrl: req.params.shortUrl,
	});
	if (result == null) return res.sendStatus(404);
	result.numberOfClicks++;
	await result.save();
	res.redirect(result.fullUrl);
};
