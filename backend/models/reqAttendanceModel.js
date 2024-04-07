const mongoose = require("mongoose");

const reqAttendanceSchema = new mongoose.Schema(
	{
		user_id: Number,
		required: Number,
	},
	{ timestamps: true }
);

const reqAttendance = mongoose.model("reqAttendance", reqAttendanceSchema);

module.exports = reqAttendance;
