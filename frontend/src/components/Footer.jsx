import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className='flex justify-evenly items-center text-sm'>
			<Link to='/'>
				<div>
					<div></div>
					<i className='fa-solid fa-house  px-1'></i>Today
				</div>
			</Link>
			<Link to='/timetable'>
				<div>
					<i className='fa-solid fa-table-cells px-1'></i>Timetable
				</div>
			</Link>
			<Link to='/calendar'>
				<div>
					<i className='fa-solid fa-calendar-days px-1'></i>Calendar
				</div>
			</Link>
			<Link to='/subjects'>
				<div>
					<i className='fa-solid fa-book px-1'></i>Subjects
				</div>
			</Link>
		</div>
	);
};

export default Footer;
