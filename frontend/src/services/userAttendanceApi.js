import axios from "axios";
const backend_url = "http://localhost:3000";

export async function setAttendance(userAttendance) {
	const user_id = 1113;
	try {
		const newAttendance = await axios.post(`${backend_url}/attendance`, {
			user_id: user_id,
			attendance: userAttendance,
		});
		localStorage.setItem("user_id", newAttendance.data.user_id);
		return newAttendance.data.user_id;
	} catch (e) {
		console.log(e);
	}
}
export async function getAttendance() {
	const user_id = Number(localStorage.getItem("user_id"));
	try {
		const newAttendance = await axios.get(`${backend_url}/attendance`, {
			params: { user_id: user_id },
		});
		return newAttendance.data.attendance;
	} catch (e) {
		console.log(e);
	}
}
