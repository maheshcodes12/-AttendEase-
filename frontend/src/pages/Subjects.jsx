import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getTimeTable } from "../services/timetableApi";
import { getAttendance, setAttendance } from "../services/userAttendanceApi";

const Homepage = () => {
	const [table, setTable] = useState([
		["TIME >", "10-11", "11-12"],
		["Monday", "Maths", "DA", "TOC", "OS"],
	]);
	const [userAttendance, setUserAttendance] = useState({
		Maths: { attended: 4, total: 5 },
		DA: { attended: 4, total: 5 },
		TOC: { attended: 4, total: 5 },
		OS: { attended: 4, total: 5 },
	});
	const [reqAttendance, setReqAttendance] = useState(75);
	useEffect(() => {
		async function getData() {
			const result1 = await getTimeTable().then((result) => {
				setTable(result.array);
				console.log(table);
			});
			const result2 = await getAttendance().then((result) => {
				setAttendance(result.attendance);
				console.log(userAttendance);
			});
		}
		getData();
	}, []);
	// const userAttendance = {
	// 	Maths: { attended: 4, total: 5 },
	// 	DA: { attended: 4, total: 5 },
	// 	TOC: { attended: 4, total: 5 },
	// 	OS: { attended: 4, total: 5 },
	// };

	var date = new Date();
	var days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	// var day = days[date.getDay()];
	var day = "Monday";

	function extractUniqueElements(table) {
		const uniqueElements = new Set();
		for (let i = 1; i < table.length; i++) {
			for (let j = 1; j < table[i].length; j++) {
				uniqueElements.add(table[i][j]);
			}
		}
		return Array.from(uniqueElements);
	}

	const allSubjects = extractUniqueElements(table);

	const allLectures = allSubjects.map((row) => (
		<div
			key={row}
			className='flex w-full justify-between px-8 py-4 border border-y'>
			<div>
				<div>{row}</div>
				<div
					className={`${
						(
							(userAttendance[row].attended / userAttendance[row].total) *
							100
						).toFixed(2) > reqAttendance
							? "bg-green-500"
							: "bg-rose-500"
					} p-1 m-1 flex justify-center items-center text-white w-20 rounded-md`}>
					{(
						(userAttendance[row].attended / userAttendance[row].total) *
						100
					).toFixed(2)}{" "}
					| {reqAttendance}
				</div>
			</div>
			<div className='flex gap-4 justify-center items-center'>
				<div className='text-rose-600'>
					{userAttendance[row].total - userAttendance[row].attended}
				</div>
				<div className='text-green-600'>{userAttendance[row].attended}</div>
				<div>{userAttendance[row].total}</div>
			</div>
		</div>
	));

	var day = days[date.getDay()];
	return (
		<div className='flex flex-col justify-end w-[100vw]'>
			<div>
				<Header />
			</div>
			<div className='h-[80vh] overflow-auto'>{allLectures}</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default Homepage;
