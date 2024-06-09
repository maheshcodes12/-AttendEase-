import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URI;
const frontendURI = import.meta.env.VITE_frontendURI;

export async function setTimeTable(timetable) {
	let table_id = localStorage.getItem("table_id");
	if (!table_id) {
		table_id = Math.floor(Math.random() * 9000) + 1000;
		localStorage.setItem("table_id", table_id);
	}
	try {
		const newtimetable = await axios.post(`${backend_url}/timetable`, {
			table_id: table_id,
			timetable: timetable,
		});
	} catch (e) {
		console.log(e);
	}
}

const makeTT = () => {
	let newTable = [];
	for (let i = 0; i < 8; i++) {
		const row = [];
		const days = [
			"Time >",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday",
		];
		for (let j = 0; j < 7; j++) {
			if (j === 0) {
				row.push(days[i]);
			} else {
				row.push("");
			}
		}
		newTable.push(row);
	}
	return newTable;
};

export async function getTimeTable() {
	const table_id = Number(localStorage.getItem("table_id"));
	if (table_id) {
		try {
			const table = await axios.get(`${backend_url}/timetable`, {
				params: { table_id: table_id },
			});
			if (table.data.success) {
				const array = table.data.timetable.array;
				const days = [
					["Time->"],
					["Monday"],
					["Tuesday"],
					["Wednesday"],
					["Thrusday"],
					["Friday"],
					["Saturday"],
				];
				if (array.length < 7) {
					for (let i = array.length; i < 7; i++) {
						array.push(days[i]);
					}
				}
				let z = 0;
				for (let i = 0; i < 7; i++, z++) {
					for (let j = array[i].length; j < 7; j++) {
						if (i == 0) array[i].push("Time");
						else array[i].push("");
					}
				}

				return table.data.timetable.array;
			} else return makeTT();
		} catch (e) {
			console.log(e);
		}
	} else {
		return makeTT();
	}
}
