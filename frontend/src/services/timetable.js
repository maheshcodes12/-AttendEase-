import axios from "axios";
const backend_url = "http://localhost:3000/";

async function getTimeTable() {
	const timetable = await axios.post(`${backend_url}/timetable`);
}

module.exports = getTimeTable;
