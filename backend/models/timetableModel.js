const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
	{
		table_id: Number,
		array: [[String]],
	},
	{ timestamps: true }
);

const Timetable = mongoose.model("Timetable", timetableSchema);

module.exports = Timetable;
