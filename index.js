import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.connection.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { limiter } from "./middlewares/rate-limit.js";
import {
    createShortUrl,
    goToShortUrl,
    showHomePage,
	deleteUrl
} from "./controllers/url.js";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

await connectDB();

app.use(limiter);

app.get("/", showHomePage);
app.post("/short-url", createShortUrl);
app.get("/:shortUrl", goToShortUrl); // add this at the end of all other routes with get
app.delete("/deleteUrl/:urlId", deleteUrl);

app.all("*", (req, res) => {
    return res.status(404).send({ message: "Route not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
