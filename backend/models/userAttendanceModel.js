const mongoose = require("mongoose");

const userAttendanceSchema = new mongoose.Schema(
	{
		user_id: Number,
		attendance: { type: Object },
	},
	{ timestamps: true }
);

const userAttendance = mongoose.model("userAttendance", userAttendanceSchema);

module.exports = userAttendance;
