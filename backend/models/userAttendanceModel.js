const mongoose = require("mongoose");

const userAttendanceSchema = new mongoose.Schema(
	{
		user_id: Number,
		attendance: mongoose.Schema.Types.Mixed,
	},
	{ timestamps: true }
);

const userAttendance = mongoose.model("userAttendance", userAttendanceSchema);

module.exports = userAttendance;
