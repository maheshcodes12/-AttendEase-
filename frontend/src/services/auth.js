import axios from "axios";
import { setReqAttendance } from "./userAttendanceApi";

const backend_url = import.meta.env.VITE_BACKEND_URI;
const frontendURI = import.meta.env.VITE_frontendURI;

export const isLoggedInApi = () => {
	const token = localStorage.getItem("token");
	console.log(token);
	return token ? true : false;
};

export const signupApi = async (name, email, password) => {
	try {
		const response = await axios.post(`${backend_url}/auth`, {
			name: name,
			email: email,
			password: password,
		});
		if (response.data.success) {
			localStorage.setItem("user_id", response.data.user_id);
			localStorage.setItem("token", response.data.token);
			loginApi(email, password);
			setReqAttendance(75);
		}
	} catch (error) {
		console.log(error);
	}
};

export const loginApi = async (email, password) => {
	try {
		const response = await axios.post(`${backend_url}/auth/login`, {
			email: email,
			password: password,
		});
		if (response.data.success) {
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("user_id", response.data.user_id);
			window.location.href = frontendURI;
		}
	} catch (error) {
		console.log(error);
	}
};
