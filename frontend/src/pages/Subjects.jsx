import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getTimeTable } from "../services/timetableApi";
import { getAttendance, setAttendance } from "../services/userAttendanceApi";
import { isLoggedInApi } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Subjects = ({ table, userAttendance, reqAtt }) => {
	const [tableSubjects, setTableSubjects] = useState();
	const [userAttendanceSubjects, setUserAttendanceSubjects] = useState();
	const [reqAttendanceSubjects, setReqAttendanceSubjects] = useState(75);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedInApi()) {
			navigate("/auth");
		}
	}, []);

	// initialize subjects states.
	useEffect(() => {
		if (table) setTableSubjects(table);
		if (userAttendance) setUserAttendanceSubjects(userAttendance);
		if (reqAtt) setReqAttendanceSubjects(reqAtt);
	}, [table, userAttendance, reqAtt]);

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

	function extractUniqueElements(tableSubjects) {
		const uniqueElements = new Set();
		if (tableSubjects)
			for (let i = 1; i < tableSubjects.length; i++) {
				for (let j = 1; j < tableSubjects[i].length; j++) {
					if (tableSubjects[i][j] != "")
						uniqueElements.add(tableSubjects[i][j]);
				}
			}
		return Array.from(uniqueElements);
	}

	const allSubjects = extractUniqueElements(tableSubjects);

	const allLectures = allSubjects.map((row, rowIndex) => (
		<div
			key={rowIndex}
			className='flex w-full justify-between px-8 py-4 border border-y'>
			<div>
				<div>{row}</div>
				{userAttendanceSubjects[row] && (
					<div
						className={`${
							(
								(userAttendanceSubjects[row].attended /
									userAttendanceSubjects[row].total) *
								100
							).toFixed(2) > reqAttendanceSubjects
								? "bg-green-500"
								: "bg-rose-500"
						} p-1 m-1 flex justify-center items-center text-white w-20 rounded-md`}>
						{(
							(userAttendanceSubjects[row].attended /
								userAttendanceSubjects[row].total) *
							100
						).toFixed(2)}{" "}
						| {reqAttendanceSubjects}
					</div>
				)}
			</div>
			<div className='flex gap-4 justify-center items-center'>
				{userAttendanceSubjects[row] && (
					<div>
						<div className='text-rose-600'>
							{userAttendanceSubjects[row].total -
								userAttendanceSubjects[row].attended}
						</div>
						<div className='text-green-600'>
							{userAttendanceSubjects[row].attended}
						</div>
						<div>{userAttendanceSubjects[row].total}</div>
					</div>
				)}
			</div>
		</div>
	));

	return (
		<div className='flex flex-col justify-end w-[100vw]'>
			<div>
				<Header userAttendance={userAttendance} />
			</div>
			<div className='h-[80vh] overflow-auto'>{allLectures}</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default Subjects;
