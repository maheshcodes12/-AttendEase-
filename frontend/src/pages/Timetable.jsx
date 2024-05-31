import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import axios from "axios";
import Footer from "../components/Footer";
import { setTimeTable, getTimeTable } from "../services/timetableApi.js";
import "./Timetable.css"; // Import CSS file for styling

const Timetable = ({ table, userAttendance }) => {
	const [uploadedImage, setUploadedImage] = useState();
	const [loading, setLoading] = useState(true);
	const [editableCell, setEditableCell] = useState({ row: -1, column: -1 });

	const backendUrl = "http://localhost:3000";

	const handleCellChange = (e, rowIndex, cellIndex) => {
		const updatedTable = [...table];
		updatedTable[rowIndex][cellIndex] = e.target.value;
		setTable(updatedTable);
	};

	const handleClick = (rowIndex, cellIndex) => {
		setEditableCell({ row: rowIndex, column: cellIndex });
	};

	const tableEntries = useMemo(() => {
		setLoading(false);
		if (!table) return [];
		return table.map((row, rowIndex) => (
			<tr key={rowIndex}>
				{row.map((cell, cellIndex) => (
					<td
						className='border text-[0.7em] p-2 min-w-12'
						key={cellIndex}
						onClick={() => handleClick(rowIndex, cellIndex)}
						style={{ width: "200px", position: "relative" }} // Set fixed width
					>
						{editableCell &&
						editableCell.row === rowIndex &&
						editableCell.column === cellIndex ? (
							<input
								type='text'
								value={cell}
								onChange={(e) => handleCellChange(e, rowIndex, cellIndex)}
								style={{
									width: "100%",
									border: "none",
									outline: "none",
									padding: "0",
								}} // Set input style
							/>
						) : (
							<span>{cell}</span>
						)}
					</td>
				))}
			</tr>
		));
	}, [table, editableCell]);

	const handleUpload = async () => {
		if (uploadedImage) {
			const formData = new FormData();
			formData.append("image", uploadedImage);

			try {
				const response = await axios.post(`${backendUrl}/upload`, formData);
				alert("Image uploaded successfully!");
			} catch (error) {
				alert("Error uploading image!");
				console.error("Error:", error);
			}
		} else {
			alert("Please select an image to upload.");
		}
	};

	const handleSaveTable = async () => {
		setTimeTable(table);
	};

	return (
		<div className='w-[100vw]'>
			<div className='w-full'>
				<Header userAttendance={userAttendance} />
			</div>
			<div className='w-full overflow-auto'>
				<div className='w-full flex flex-col justify-center items-center py-2 gap-3 text-sm'>
					<div className='border rounded-lg py-1 px-4'>
						Auto-generate table by uploading image
					</div>
					<input
						type='file'
						accept='image/*'
						onChange={(e) => {
							setUploadedImage(e.target.files[0]);
						}}
					/>
					<button
						onClick={handleUpload}
						className='border p-2'>
						Upload image
					</button>
				</div>
				<div className='mx-auto w-full flex justify-center items-center text-sm'>
					- OR -
				</div>
				{!loading ? (
					<div className='w-full h-[60vh] flex flex-col justify-center gap-2 items-center overflow-auto py-2'>
						<div>
							<table className='border-collapse border-2 border-slate-400  table-auto'>
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
						<i className='fa-solid fa-spinner fa-spin-pulse < class="fa-solid fa-spinner fa-spin-pulse fa-2xl'></i>
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
