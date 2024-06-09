import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import axios from "axios";
import Footer from "../components/Footer";
import { setTimeTable, getTimeTable } from "../services/timetableApi.js";
import "./Timetable.css"; // Import CSS file for styling
import { isLoggedInApi } from "../services/auth.js";
import { useNavigate } from "react-router-dom";

const Timetable = ({ table, userAttendance }) => {
	const [tableData, setTableData] = useState(table);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedInApi()) {
			navigate("/auth");
		}
	}, []);

	useEffect(() => {
		if (table) {
			setTableData(table);
			setLoading(false);
		}
	}, [table]);

	const handleCellChange = (e, rowIndex, cellIndex) => {
		const updatedTable = tableData.map((row, rIndex) => {
			if (rIndex === rowIndex) {
				return row.map((cell, cIndex) =>
					cIndex === cellIndex ? e.target.value : cell
				);
			}
			return row;
		});
		setTableData(updatedTable);
	};

	const tableEntries = useMemo(() => {
		if (!tableData) return [];
		return tableData.map((row, rowIndex) => (
			<tr key={rowIndex}>
				{row.map((cell, cellIndex) => (
					<td
						className='border text-[0.7em] p-2 min-w-12'
						key={cellIndex}
						style={{ width: "200px", position: "relative" }} // Set fixed width
					>
						<div>
							<input
								type='text'
								value={cell || ""}
								onChange={(e) => handleCellChange(e, rowIndex, cellIndex)}
								style={{
									width: "100%",
									border: "none",
									outline: "none",
									padding: "0",
								}}
								className={`${
									rowIndex === 0 || cellIndex === 0
										? "font-semibold text-wrap"
										: ""
								}`}
							/>
						</div>
					</td>
				))}
			</tr>
		));
	}, [tableData]);

	const handleSaveTable = async () => {
		setTimeTable(tableData);
	};

	return (
		<div className='w-[100vw]'>
			<div className='w-full'>
				<Header userAttendance={userAttendance} />
			</div>
			<div className='w-full overflow-auto flex justify-center'>
				{!loading ? (
					<div className='w-[70%] h-[80vh] flex flex-col justify-center gap-2 items-center overflow-auto py-2'>
						<div>
							<table className='border-collapse border-2 border-slate-400 table-auto'>
								<tbody
									id='example-table'
									className='w-[60vw] h-[50vh]'>
									{tableEntries}
								</tbody>
							</table>
						</div>
						<button
							className='border p-2 px-4 border-slate-600 text-sm'
							onClick={handleSaveTable}>
							SAVE
						</button>
					</div>
				) : (
					<div className='w-full h-[57vh] flex flex-col justify-center items-center overflow-auto py-2'>
						<i className='fa-solid fa-spinner fa-spin-pulse fa-2xl'></i>
					</div>
				)}
			</div>

			<div className='pt-2'>
				<Footer />
			</div>
		</div>
	);
};

export default Timetable;
