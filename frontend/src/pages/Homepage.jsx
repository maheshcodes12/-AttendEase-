import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Homepage = () => {
	const timetable = [
		["TIME >", "10-11", "11-12"],
		["Monday", "Maths", "DA", "TOC", "OS"],
	];
	const [table, setTable] = useState(timetable);
	const [userAttendance, setUserAttendance] = useState({
		Maths: { attended: 4, total: 5 },
		DA: { attended: 4, total: 5 },
		TOC: { attended: 4, total: 5 },
		OS: { attended: 4, total: 5 },
	});
	const [lectureCount, setLectureCount] = useState({});
	const [reqAttendance, setReqAttendance] = useState(75);
	const [addMenu, setAddMenu] = useState(false);
	const [lastaction, setLastaction] = useState(0);
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

	function setLectureCountForToday() {
		const lectureCounts = {};
		for (let i = 1; i < table.length; i++) {
			if (day === table[i][0]) {
				for (let j = 1; j < table[i].length; j++) {
					const subject = table[i][j];
					if (!lectureCounts[subject]) {
						lectureCounts[subject] = 1;
					} else {
						lectureCounts[subject] += 1;
					}
				}
				break;
			}
		}
		setLectureCount(lectureCounts);
	}

	useEffect(() => {
		setLectureCountForToday();
	}, []);

	function handleAddExtraLecture(subject) {
		setAddMenu(!addMenu);
		if (subject) {
			for (let i = 1; i < table.length; i++) {
				if (table[i][0] === day) {
					const newTable = table;
					newTable[i].push(subject);
					setTable(newTable);
				}
			}
		}
		setLectureCountForToday();
	}
	function handleClassStatus(status, cell) {
		const todaysAttendance = userAttendance;
		const lectureCounts = lectureCount;
		if (status == 0) {
			setLastaction(0);
			if (lastaction == 1) {
				todaysAttendance[cell].attended = userAttendance[cell].attended;
				todaysAttendance[cell].total = userAttendance[cell].total - 1;
				lectureCounts[cell]++;
			}
			if (lastaction == 2) {
				todaysAttendance[cell].attended = userAttendance[cell].attended - 1;
				todaysAttendance[cell].total = userAttendance[cell].total - 1;
				lectureCounts[cell]++;
			}
		}
		if (status == 1) {
			if (lectureCounts[cell] && lastaction == 0) {
				todaysAttendance[cell].attended = userAttendance[cell].attended;
				todaysAttendance[cell].total = userAttendance[cell].total + 1;
				lectureCounts[cell]--;
			}
			if (lectureCounts[cell] && lastaction == 1) {
				todaysAttendance[cell].attended = userAttendance[cell].attended;
				todaysAttendance[cell].total = userAttendance[cell].total + 1;
				lectureCounts[cell]--;
			}
			if (lastaction == 2) {
				todaysAttendance[cell].attended = userAttendance[cell].attended - 1;
				todaysAttendance[cell].total = userAttendance[cell].total;
			}
			setLastaction(1);
		}
		if (status == 2) {
			if (lectureCounts[cell] && lastaction == 0) {
				todaysAttendance[cell].attended = userAttendance[cell].attended + 1;
				todaysAttendance[cell].total = userAttendance[cell].total + 1;
				lectureCounts[cell]--;
			}
			if (lastaction == 1) {
				todaysAttendance[cell].attended = userAttendance[cell].attended + 1;
				todaysAttendance[cell].total = userAttendance[cell].total;
			}
			if (lectureCounts[cell] && lastaction == 2) {
				todaysAttendance[cell].attended = userAttendance[cell].attended + 1;
				todaysAttendance[cell].total = userAttendance[cell].total + 1;
				lectureCounts[cell]--;
			}
			setLastaction(2);
		}
		setUserAttendance(todaysAttendance);
		setLectureCount(lectureCounts);
		console.log(lectureCount);
		console.log(userAttendance);
		console.log(lastaction);
	}
	const todaysLectures = table.map((row, rowIndex) => (
		<div key={rowIndex}>
			{row[0] == day &&
				row.map((cell, cellIndex) => (
					<div
						className='border border-y'
						key={cellIndex}>
						{cellIndex > 0 && (
							<div
								key={cellIndex}
								className='p-2 flex justify-between items-center'>
								<div>
									<div className='p-2  text-lg'>{cell}</div>
									<div
										className={`${
											(
												(userAttendance[cell].attended /
													userAttendance[cell].total) *
												100
											).toFixed(2) > reqAttendance
												? "bg-green-500"
												: "bg-rose-500"
										} p-1 m-1 flex justify-center items-center text-white w-20 rounded-md`}>
										{(
											(userAttendance[cell].attended /
												userAttendance[cell].total) *
											100
										).toFixed(2)}{" "}
										| {reqAttendance}
									</div>
								</div>
								<div className='flex gap-4 px-6'>
									<div
										className='hover:bg-slate-200 rounded-full p-1'
										onClick={() => handleClassStatus(0, cell)}>
										<i className='fa-solid fa-ban fa-lg  inline-block'></i>
									</div>
									<div
										className={`hover:bg-slate-200  rounded-full p-1 `}
										onClick={() => handleClassStatus(1, cell)}>
										<i
											className={`fa-regular fa-circle-xmark fa-lg inline-block `}></i>
									</div>
									<div
										className='hover:bg-slate-200 rounded-full p-1'
										onClick={() => handleClassStatus(2, cell)}>
										<i className='fa-regular fa-circle-check fa-lg  inline-block'></i>
									</div>
								</div>
							</div>
						)}
					</div>
				))}
		</div>
	));
	function extractUniqueSubjects(table) {
		const subjects = new Set();

		for (let i = 1; i < table.length; i++) {
			for (let j = 1; j < table[i].length; j++) {
				subjects.add(table[i][j]);
			}
		}

		return Array.from(subjects);
	}
	const uniqueSubjects = extractUniqueSubjects(table);
	const availableSubjects = uniqueSubjects.map((sub) => (
		<div
			key={sub}
			className='p-8 flex justify-between items-center border border-y cursor-pointer'
			onClick={() => handleAddExtraLecture(sub)}>
			{sub}
		</div>
	));

	return (
		<div className='flex flex-col justify-end w-[100vw]'>
			<div>
				<Header />
			</div>
			<div className='h-[80vh] overflow-auto'>
				<div>{todaysLectures}</div>
				<div className='flex justify-center items-center py-8 '>
					<button
						className='border p-1 rounded-md px-4'
						onClick={() => handleAddExtraLecture()}>
						{addMenu ? "Cancel" : "Add Extra Lecture"}
					</button>
				</div>
				<div>{addMenu && availableSubjects}</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default Homepage;
