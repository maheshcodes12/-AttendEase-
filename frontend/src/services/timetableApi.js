import axios from "axios";
const backend_url = "http://localhost:3000";

export async function setTimeTable(timetable) {
	const table_id = 1113;
	try {
		const newtimetable = await axios.post(`${backend_url}/timetable`, {
			table_id: table_id,
			timetable: timetable,
		});
		localStorage.setItem("table_id", newtimetable.data.table_id);
		return timetable.table_id;
	} catch (e) {
		console.log(e);
	}
}
export async function getTimeTable() {
	const table_id = Number(localStorage.getItem("table_id"));
	try {
		const table = await axios.get(`${backend_url}/timetable`, {
			params: { table_id: table_id },
		});
		return table.data.timetable;
	} catch (e) {
		console.log(e);
	}
}
