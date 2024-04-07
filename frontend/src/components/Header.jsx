import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ params }) => {
	var date = new Date();
	const [reqAttendance, setReqAttendance] = useState(75);
	const [currentAttendance, setCurrentAttendance] = useState(0);
	const [userAttendance, setUserAttendance] = useState({
		Maths: { attended: 4, total: 5 },
		DA: { attended: 4, total: 5 },
		TOC: { attended: 4, total: 5 },
		OS: { attended: 4, total: 5 },
	});
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		var attended = 0;
		var total = 0;
		for (const key in userAttendance) {
			if (userAttendance.hasOwnProperty.call(userAttendance, key)) {
				const element = userAttendance[key];
				attended += element.attended;
				total += element.total;
			}
		}
		setCurrentAttendance((attended / total).toFixed(2) * 100);
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

	return (
		<div>
			<div className='w-100vw h-full flex justify-evenly items-center py-2'>
				<div>{formattedDate}</div>
				<div className='border rounded-md p-2'>
					{currentAttendance} | {reqAttendance}
				</div>
				<div onClick={handleMenu}>
					<i className='fa-solid fa-bars fa-xl'></i>
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
