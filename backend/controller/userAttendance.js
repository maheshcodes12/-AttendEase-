const userAttendance = require("../models/userAttendanceModel.js");
const reqAttendance = require("../models/reqAttendanceModel.js");

async function setUserAttendance(req, res) {
	try {
		const { user_id, attendance } = req.body;

		// Check if attendance already exists for the provided user_id
		let existingAttendance = await userAttendance.findOne({ user_id: user_id });

		if (existingAttendance) {
			// If attendance exists, update it
			existingAttendance.attendance = attendance;
			await existingAttendance.save();
			res.status(200).json({
				success: true,
				message: "Attendance updated successfully",
				user_id: user_id,
			});
		} else {
			// If no attendance exists, create a new one
			const newAttendance = new userAttendance({
				user_id: user_id,
				attendance: attendance,
			});
			await newAttendance.save();
			res.status(200).json({
				success: true,
				message: "New attendance created successfully",
				user_id: user_id,
			});
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while setting attendance",
		});
	}
}

async function getUserAttendance(req, res) {
	try {
		const { user_id } = req.query;

		if (!user_id) {
			return res
				.status(400)
				.json({ success: false, message: "User ID is required" });
		}

		// Find attendance data for the provided user_id
		const attendance = await userAttendance.findOne({ user_id: user_id });

		if (!attendance) {
			return res.status(404).json({
				success: false,
				message: "Attendance data not found for the provided user ID",
			});
		}

		res.status(200).json({ success: true, attendance: attendance });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching attendance data",
		});
	}
}

async function setReqAttendance(req, res) {
	try {
		const { user_id, required } = req.body;

		let existingAttendance = await reqAttendance.findOne({ user_id: user_id });

		if (existingAttendance) {
			// If attendance exists, update it
			existingAttendance.required = required;
			await existingAttendance.save();
			res.status(200).json({
				success: true,
				message: "Req Attendance updated successfully",
				user_id: user_id,
			});
		} else {
			// If no attendance exists, create a new one
			const newAttendance = new reqAttendance({
				user_id: user_id,
				required: required,
			});
			await newAttendance.save();
			res.status(200).json({
				success: true,
				message: "New req attendance created successfully",
				user_id: user_id,
			});
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while setting req attendance",
		});
	}
}

async function getReqAttendance(req, res) {
	try {
		const { user_id } = req.query;

		if (!user_id) {
			return res
				.status(400)
				.json({ success: false, message: "User ID is required" });
		}

		// Find attendance data for the provided user_id
		const required = await reqAttendance.findOne({ user_id: user_id });

		if (!required) {
			return res.status(404).json({
				success: false,
				message: "Attendance data not found for the provided user ID",
			});
		}

		res.status(200).json({ success: true, required: required });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching attendance data",
		});
	}
}

module.exports = {
	setUserAttendance,
	getUserAttendance,
	setReqAttendance,
	getReqAttendance,
};
