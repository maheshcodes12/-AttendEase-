const Timetable = require("../models/timetableModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const uploadImage = async (req, res) => {
	if (!req.file) {
		return res.status(400).send("No file uploaded.");
	}

	const filePath = req.file.path;

	const destinationPath = "uploads/" + req.file.originalname;
	fs.rename(filePath, destinationPath, (err) => {
		if (err) {
			console.error("Error moving file:", err);
			return res.status(500).send("Error uploading file.");
		}

		console.log("File saved:", destinationPath);
		res.send("file uploaded successfully");
	});
};

module.exports = uploadImage;
