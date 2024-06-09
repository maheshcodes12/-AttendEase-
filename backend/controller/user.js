const user = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

async function login(req, res) {
	console.log("first");
	const { email, password } = req.body;
	try {
		const exist = await user.find({ email: email });
		const user_id = exist[0].user_id;
		const password_in_db = exist[0].password;
		let password_match = false;
		if (password_in_db === password) password_match = true;
		if (exist && password_match) {
			const token = jwt.sign({ email: email }, "TT", {
				expiresIn: "1h",
			});
			return res.status(200).json({
				success: true,
				message: "Logged in successfully",
				token: token,
				user_id: user_id,
			});
		} else if (!password_match) {
			return res
				.status(404)
				.json({ success: false, message: "Invalid password" });
		} else {
			return res
				.status(404)
				.json({ success: false, message: "User does not exist" });
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while logging" });
	}
}

async function signup(req, res) {
	const { name, email, password } = req.body;

	try {
		const exist = await user.findOne({ email: email });
		if (exist) {
			return res.status(404).json({
				success: false,
				message: "User already exists",
			});
		} else {
			const user_id = Math.floor(Math.random() * 9000) + 1000;

			const userr = new user({
				user_id: user_id,
				name: name,
				email: email,
				password: password,
			});
			await userr.save();

			return res.status(200).json({
				success: true,
				message: "User signed in successfully",
				user_id: user_id,
			});
		}
	} catch (e) {
		return res
			.status(404)
			.json({ success: false, message: "Problem while signing" });
	}
}

module.exports = { login, signup };
