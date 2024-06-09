const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const timetableRoute = require("./routes/timetableRoute.js");
const authRoute = require("./routes/auth.js");

var mongoose = require("mongoose");
const userAttendanceRoute = require("./routes/userAttendanceRoute.js");

var mongoDB = "mongodb://localhost:27017/TT";
mongoose
	.connect(mongoDB)
	.then(() => {
		console.log("Mongodb Connected");
	})
	.catch((e) => {
		console.log("Error: ", e);
	});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

dotenv.config({
	path: "./.env",
});

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

// Multer configuration for file upload
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});
const upload = multer({ storage: storage });
// Serve static files
app.use(express.static("public"));

app.use("/timetable", timetableRoute);
app.use("/attendance", userAttendanceRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
