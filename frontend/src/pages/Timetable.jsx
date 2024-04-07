import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import Footer from "../components/Footer";
import { setTimeTable, getTimeTable } from "../services/timetableApi.js";

const Timetable = () => {
	const [uploadedImage, setUploadedImage] = useState();
	const [table, setTable] = useState([]);
	const [editableCell, setEditableCell] = useState(null);

	const backendUrl = "http://localhost:3000";

	useEffect(() => {
		const table = [];

		for (let i = 0; i < 8; i++) {
			const row = [];
			const days = [
				"Time >",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thrusday",
				"Friday",
				"Saturday",
				"Sunday",
			];

			for (let j = 0; j < 7; j++) {
				if (j == 0) {
					row.push(days[i]);
				} else {
					row.push("");
				}
			}
			table.push(row);
		}
		setTable(table);
	}, []);

	const handleCellDoubleClick = (rowIndex, cellIndex) => {
		setEditableCell({ rowIndex, cellIndex });
	};

	const handleCellBlur = () => {
		setEditableCell(null);
	};

	const handleCellChange = (e, rowIndex, cellIndex) => {
		const updatedTable = table;
		updatedTable[rowIndex][cellIndex] = e.target.innerText;
		setTable(updatedTable);
	};

	const tableEntries = table.map((row, rowIndex) => (
		<tr key={rowIndex}>
			{row.map((cell, cellIndex) => (
				<td
					className='border text-[0.7em] p-2 min-w-12'
					key={cellIndex}
					onDoubleClick={() => handleCellDoubleClick(rowIndex, cellIndex)}
					onBlur={handleCellBlur}
					contentEditable={
						editableCell &&
						editableCell.rowIndex === rowIndex &&
						editableCell.cellIndex === cellIndex
					}
					suppressContentEditableWarning={true}
					onInput={(e) => {
						handleCellChange(e, rowIndex, cellIndex);
					}}>
					{cell}
				</td>
			))}
		</tr>
	));

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
				<Header />
			</div>
			<div className='w-full overflow-auto'>
				<div className='w-full flex flex-col justify-center items-center py-6 gap-3'>
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
				<div className='mx-auto w-full flex justify-center items-center py-2'>
					- OR -
				</div>
				<div className='w-full flex flex-col justify-center items-center overflow-auto py-2'>
					<div>
						<table className='border-collapse table-auto'>
							<tbody
								id='example-table'
								className='w-[60vw] h-[50vh]'>
								{tableEntries}
							</tbody>
						</table>
					</div>
					<button
						className='border p-4'
						onClick={handleSaveTable}>
						SAVE
					</button>
				</div>
			</div>
			<div className='pt-2'>
				<Footer />
			</div>
		</div>
	);
};

export default Timetable;
