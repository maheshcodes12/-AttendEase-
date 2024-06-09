import axios from "axios";
import { getTimeTable } from "./timetableApi";
const backend_url = import.meta.env.VITE_BACKEND_URI;
const frontendURI = import.meta.env.VITE_frontendURI;

export async function setAttendance(userAttendance) {
	let user_id = localStorage.getItem("user_id");

	if (user_id) {
		try {
			const newAttendance = await axios.post(`${backend_url}/attendance`, {
				user_id: user_id,
				attendance: userAttendance,
			});
		} catch (e) {
			console.log(e);
		}
	} else {
		return makeAttendance();
	}
}

const makeAttendance = async () => {
	const attendance = {};
	const timetable = await getTimeTable().then((timetable) => {
		for (let i = 0; i < timetable.length; i++) {
			for (let j = 1; j < timetable[i].length; j++) {
				const subject = timetable[i][j];
				if (subject !== "") {
					if (!attendance[subject]) {
						attendance[subject] = { attended: 0, total: 0 };
					}
				}
			}
		}
	});

	return attendance;
};

export async function getAttendance() {
	let user_id = localStorage.getItem("user_id");
	let userAttendance;
	if (user_id) {
		user_id = Number(user_id);
		try {
			const response = await axios
				.get(`${backend_url}/attendance`, {
					params: { user_id: user_id },
				})
				.then((a) => {
					if (a.data.success) userAttendance = a.data.attendance;
					else userAttendance = makeAttendance();
				});

			return userAttendance;
		} catch (e) {
			console.log(e);
		}
	} else {
		return makeAttendance();
	}
}

export async function setReqAttendance(required) {
	let user_id = localStorage.getItem("user_id");
	if (user_id) {
		user_id = Number(user_id);
		try {
			await axios.post(`${backend_url}/attendance/req`, {
				user_id: user_id,
				required: required,
			});
		} catch {
			console.log("error while setting req attendance");
			return false;
		}
	} else {
		return false;
	}
}

// pending required.required
export async function getReqAttendance() {
	let user_id = localStorage.getItem("user_id");
	if (user_id) {
		user_id = Number(user_id);
		try {
			const reqAttendance = await axios.get(`${backend_url}/attendance/req`, {
				params: { user_id: user_id },
			});
			return reqAttendance.data.required.required;
		} catch {
			console.log("error while getting req attendance");
			return 75;
		}
	} else {
		return 75;
	}
}
