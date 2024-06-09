import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
	setReqAttendance,
	getReqAttendance,
} from "../services/userAttendanceApi";

const Header = ({ userAttendance }) => {
	var date = new Date();
	const [reqAttendanceHeader, setReqAttendanceHeader] = useState(75);
	const [currentAttendance, setCurrentAttendance] = useState(0);
	const [userAttendanceHeader, setUserAttendanceHeader] =
		useState(userAttendance);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		var attended = 0;
		var total = 0;
		for (const key in userAttendanceHeader) {
			if (userAttendance.hasOwnProperty.call(userAttendance, key)) {
				const element = userAttendance[key];
				attended += element.attended;
				total += element.total;
			}
		}
		let att = 0;
		total === 0 ? (att = 0) : (att = (attended / total).toFixed(2) * 100);
		setCurrentAttendance(att);
	}, [userAttendanceHeader]);

	useEffect(() => {
		async function get() {
			const a = await getReqAttendance();
			setReqAttendanceHeader(a);
			setUserAttendanceHeader(userAttendance);
			setIsLoading(false); // set loading to false once data is fetched
		}
		get();
	}, [userAttendance]);

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
	var dayOfMonth = date.getDate();
	var month = date.toLocaleString("default", { month: "long" }); // Full month name
	var year = date.getFullYear().toString();

	var formattedDate = day + ", " + dayOfMonth + " " + month + " " + year;

	function handleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}
	const [submit, setSubmit] = useState(false);

	const handleInputBlur = (e) => {
		let content = e.target.value;
		if (content) {
			setReqAttendanceHeader(content);
			setReqAttendance(content);
		}
	};

	return (
		<div>
			<div className='w-100vw h-full flex justify-evenly items-center py-2'>
				<div>{formattedDate}</div>
				<div className='border rounded-md p-2 pr-0 flex'>
					{currentAttendance.toFixed(2)} |{" "}
					{!isLoading && (
						<input
							className='pl-1 focus:outline-none w-7'
							onBlur={handleInputBlur}
							defaultValue={reqAttendanceHeader}
						/>
					)}
				</div>
				<div onClick={handleMenu}>
					<i className='fa-solid fa-user cursor-pointer'></i>
				</div>
			</div>
			<div>
				{isMenuOpen && (
					<div
						className='z-10 fixed h-[78vh] w-[100vw] bg-slate-200'
						onClick={handleMenu}>
						<div className='flex flex-col justify-center items-center h-full gap-16 text-2xl'>
							<Link to='/account'>
								<div>Account</div>
							</Link>

							<Link to='/account'>
								<div>Settings</div>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
