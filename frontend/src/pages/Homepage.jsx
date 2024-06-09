import React, { useEffect, useState, useMemo, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { setAttendance } from "../services/userAttendanceApi";
import { isLoggedInApi } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Homepage = ({ table, userAttendance, reqAtt }) => {
	const [lectureCount, setLectureCount] = useState({});
	const [addMenu, setAddMenu] = useState(false);
	const [todaysLectures, setTodaysLectures] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [tableHome, setTableHome] = useState([]);
	const [userAttendanceHome, setUserAttendanceHome] = useState({});
	const [reqAttendance, setReqAttendance] = useState(75);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedInApi()) {
			navigate("/auth");
		}
	}, []);

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
	var day = days[date.getDay()];

	useEffect(() => {
		if (table) setTableHome(table);
		if (userAttendance) setUserAttendanceHome(userAttendance);
		if (reqAtt) setReqAttendance(reqAtt);
	}, [table, userAttendance, reqAtt]);

	function setLectureCountForToday() {
		const lectureCounts = {};
		if (tableHome) {
			for (let i = 1; i < tableHome.length; i++) {
				if (day === tableHome[i][0]) {
					for (let j = 1; j < tableHome[i].length; j++) {
						const subject = tableHome[i][j];
						if (!lectureCounts[subject] && subject !== "") {
							lectureCounts[subject] = 1;
						} else if (subject !== "") {
							lectureCounts[subject] += 1;
						}
					}
					break;
				}
			}
		}
		setLectureCount(lectureCounts);
	}

	useEffect(() => {
		setLectureCountForToday();
	}, [tableHome]);

	function handleAddExtraLecture(subject) {
		if (subject && tableHome) {
			const newTable = [...tableHome];
			for (let i = 1; i < newTable.length; i++) {
				if (newTable[i][0] === day) {
					newTable[i].push(subject);
					setTableHome(newTable);
					break;
				}
			}
		}
		setAddMenu(!addMenu);
		setLectureCountForToday();
	}

	class Subject {
		constructor(status, name, marked, serial) {
			this.serial = serial;
			this.name = name;
			this.status = status;
			this.marked = marked;
		}
	}
	const structref = useRef();
	const [struct, setStruct] = useState(() => {
		const savedStruct = localStorage.getItem("struct");
		return savedStruct ? JSON.parse(savedStruct) : [];
	});
	useEffect(() => {
		structref.current = struct;
	}, [struct]);

	useEffect(() => {
		localStorage.setItem("struct", JSON.stringify(struct));
	}, [struct]);

	useEffect(() => {
		const newArray = [...structref.current];
		for (let i = 1; i < tableHome.length; i++) {
			if (tableHome[i][0] === day) {
				for (let j = 1; j < tableHome[i].length; j++) {
					const element = tableHome[i][j];
					if (element) {
						const obj = new Subject(0, element, 0, j);
						const existing = newArray.find(
							(sub) => sub.name === element && sub.serial === j
						);
						if (!existing) newArray.push(obj);
					}
				}
				break;
			}
		}
		setStruct(newArray);
	}, [tableHome, day]);

	function handleClassStatus(cell, cellIndex, whatToDo) {
		const newUserAttendance = { ...userAttendanceHome };
		let newStruct = [...struct];
		for (let i = 0; i < struct.length; i++) {
			const element = struct[i];
			if (
				cell === element.name &&
				cellIndex === element.serial &&
				newUserAttendance[cell]
			) {
				if (element.marked === 0) {
					if (whatToDo === 1) {
						newUserAttendance[cell].total += 1;
						newUserAttendance[cell].attended += 1;
						element.marked = 1;
					} else if (whatToDo === 2) {
						newUserAttendance[cell].total += 1;
						element.marked = 2;
					} else if (whatToDo === 0) {
						element.marked = 0;
					}
				} else {
					if (element.marked === 1) {
						newUserAttendance[cell].total -= 1;
						newUserAttendance[cell].attended -= 1;
					} else if (element.marked === 2) {
						newUserAttendance[cell].total -= 1;
					}
					if (whatToDo === 1) {
						newUserAttendance[cell].total += 1;
						newUserAttendance[cell].attended += 1;
						element.marked = 1;
					} else if (whatToDo === 2) {
						newUserAttendance[cell].total += 1;
						element.marked = 2;
					} else if (whatToDo === 0) {
						element.marked = 0;
					}
				}
				if (!newStruct.includes(element)) newStruct = [...newStruct, element];
				setStruct(newStruct);
				setUserAttendanceHome(newUserAttendance);
				setAttendance(userAttendanceHome);
			}
		}
	}
	// Components
	useEffect(() => {
		const array12 = tableHome.map((row, rowIndex) => (
			<div key={rowIndex}>
				{row[0] === day &&
					row.map(
						(cell, cellIndex) =>
							cell != "" && (
								<div
									className='border border-y'
									key={cellIndex}>
									{cellIndex > 0 && (
										<div
											key={cellIndex}
											className='p-2 flex justify-between items-center'>
											<div>
												<div className='p-2  text-lg'>{cell != "" && cell}</div>
												{userAttendanceHome && (
													<div
														className={`${
															(
																(userAttendanceHome[cell]?.attended /
																	userAttendanceHome[cell]?.total) *
																100
															).toFixed(2) > reqAttendance
																? "bg-green-500"
																: "bg-rose-500"
														} p-1 m-1 flex justify-center items-center text-white w-20 rounded-md`}>
														{userAttendanceHome[cell]?.total > 0
															? (
																	(userAttendanceHome[cell]?.attended /
																		userAttendanceHome[cell]?.total) *
																	100
															  ).toFixed(2)
															: "00"}{" "}
														|{" "}
														{userAttendanceHome[cell]?.total > 0
															? reqAttendance
															: "00"}
													</div>
												)}
											</div>

											<div className='flex gap-4 px-6'>
												<div
													className='hover:bg-slate-200 rounded-full p-1'
													onClick={() => handleClassStatus(cell, cellIndex, 0)}>
													<i className='fa-solid fa-ban fa-lg  inline-block'></i>
												</div>
												<div
													className={`hover:bg-slate-200  rounded-full p-1 `}
													onClick={() => handleClassStatus(cell, cellIndex, 2)}>
													<i
														className={`fa-regular fa-circle-xmark fa-lg inline-block `}></i>
												</div>
												<div
													className='hover:bg-slate-200 rounded-full p-1'
													onClick={() => handleClassStatus(cell, cellIndex, 1)}>
													<i className='fa-regular fa-circle-check fa-lg  inline-block'></i>
												</div>
											</div>
										</div>
									)}
								</div>
							)
					)}
			</div>
		));
		setTodaysLectures(array12);
	}, [tableHome, userAttendanceHome, struct]);

	function extractUniqueSubjects(table) {
		if (!table) return [];
		const subjects = new Set();

		for (let i = 1; i < table.length; i++) {
			for (let j = 1; j < table[i].length; j++) {
				if (table[i][j] != "") subjects.add(table[i][j]);
			}
		}

		return Array.from(subjects);
	}
	const uniqueSubjects = extractUniqueSubjects(tableHome);
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
				<Header userAttendance={userAttendanceHome} />
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
