import { UrlShortModel } from "../model/urlShort.js";

export const showHomePage = async (req, res, next) => {
    try {
        const urls = await UrlShortModel.find();
        res.render("index", { urls });
    } catch (error) {
        next(error);
    }
};

export const createShortUrl = async (req, res, next) => {
    const { fullUrl } = req.body;
    try {
        const isUrlExist = await UrlShortModel.findOne({ fullUrl });
        if (isUrlExist) throw new Error("This url already exist");
        await UrlShortModel.create({ fullUrl });
        res.redirect("/");
    } catch (error) {
        next(error);
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
        next(error);
    }
};

export const deleteUrl = async (req, res, next) => {
    const { urlId } = req.params;
    try {
        const url = await UrlShortModel.findById(urlId);
        if (!url) throw new Error("This url does not exist");
        const deletedUrl = await UrlShortModel.findByIdAndDelete(urlId, { new: true });
        res.redirect("/");
    } catch (error) {
        next(error);
    }
};
