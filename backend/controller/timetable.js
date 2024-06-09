const Timetable = require("../models/timetableModel.js");

async function setTimetable(req, res) {
	try {
		const { table_id, timetable } = req.body;

		let existingTimetable = await Timetable.findOne({ table_id: table_id });

		if (existingTimetable) {
			existingTimetable.array = timetable;
			await existingTimetable.save();
			res.status(200).json({
				success: true,
				message: "Timetable updated successfully",
				table_id: table_id,
			});
		} else {
			const newTimetable = new Timetable({
				table_id: table_id,
				array: timetable,
			});
			await newTimetable.save();
			res.status(200).json({
				success: true,
				message: "New timetable created successfully",
				table_id: table_id,
			});
		}
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while setting timetable",
		});
	}
}

const getTimetable = async (req, res) => {
	try {
		const { table_id } = req.query;

		if (!table_id) {
			return res
				.status(400)
				.json({ success: false, message: "Table ID is required" });
		}

		// Fetch timetable based on table_id
		const timetable = await Timetable.findOne({ table_id: table_id });

		if (!timetable) {
			return res
				.status(404)
				.json({ success: false, message: "Timetable not found" });
		}

		res.status(200).json({ success: true, timetable: timetable });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching timetable",
		});
	}
};

module.exports = { setTimetable, getTimetable };
