import { UrlShortModel } from "../model/urlShort.js";

export const showHomePage = async (req, res, next) => {
	try {
		const urls = await UrlShortModel.find();
		res.render("index", { urls });
	} catch (error) {
		console.error(error);
		next(error)
	}
};

export const createShortUrl = async (req, res, next) => {
	try {
		await UrlShortModel.create({
			fullUrl: req.body.fullUrl,
		});
		res.redirect("/");
	} catch (error) {
		console.log(error);
		next(error)
	}
};

export const goToShortUrl = async (req, res, next) => {
	try {
		const result = await UrlShortModel.findOne({
			shortUrl: req.params.shortUrl,
		});
		if (result == null) return res.sendStatus(404);
		result.numberOfClicks++;
		await result.save();
		res.redirect(result.fullUrl);
	} catch (error) {
		console.log(error);
		next(error)
	}
};
