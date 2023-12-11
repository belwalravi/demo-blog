const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const IndexRoute = require("./Routers/index");
const connectDatabase = require("./Helpers/database/connectDatabase");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");

dotenv.config({
	path: "./Config/config.env",
});

connectDatabase();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", IndexRoute);

app.use(customErrorHandler);

const PORT = process.env.SERVER;

app.use(express.static(path.join(__dirname, "public"))); //

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "../../build")));

	app.use("*", async (req, res) => {
		res.sendFile(path.resolve(__dirname, "../../build", "index.html"));
	});
}

const server = app.listen(PORT, () => {
	console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err, promise) => {
	console.log(`Logged Error : ${err}`);

	server.close(() => process.exit(1));
});
