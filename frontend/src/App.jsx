import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Timetable from "./pages/Timetable";
import Subjects from "./pages/Subjects";
import { NotFound } from "./pages/NotFound";

//importing apis
import { setTimeTable, getTimeTable } from "./services/timetableApi";
import {
	setAttendance,
	getAttendance,
	setReqAttendance,
	getReqAttendance,
} from "./services/userAttendanceApi";

function App() {
	const [table, setTable] = useState([]);
	const [userAttendance, setUserAttendance] = useState();
	const [reqAtt, setReqAtt] = useState(75);

	// get timetable attendance and req
	useEffect(() => {
		async function fetchData() {
			// get timetable
			const data = await getTimeTable();
			setTable(data);
			// get userAttendance
			const data2 = await getAttendance();
			setUserAttendance(data2);
			const data3 = await getReqAttendance();
			setReqAtt(data3);
		}
		fetchData();
	}, []);

	// if any subject from table is not present in userAttendance.
	useEffect(() => {
		let changed = false;
		const updateAttendance = () => {
			const newAttendanceData = { ...userAttendance };
			if (table) {
				for (let i = 1; i < table.length; i++) {
					for (let j = 1; j < table[i].length; j++) {
						const subject = table[i][j];
						if (!newAttendanceData[subject] && subject != "") {
							changed = true;
							newAttendanceData[subject] = { attended: 0, total: 0 };
						} else if (typeof newAttendanceData[subject] !== "object") {
							newAttendanceData[subject] = { attended: 0, total: 0 };
						}
					}
				}
			}

			setUserAttendance(newAttendanceData);
			if (changed) setAttendance(newAttendanceData);
		};

		if (table) {
			updateAttendance();
		}
	}, [table]);

	return (
		<div>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<Homepage
								table={table}
								userAttendance={userAttendance}
								reqAtt={reqAtt}
							/>
						}
					/>
					<Route
						path='/timetable'
						element={
							<Timetable
								table={table}
								userAttendance={userAttendance}
							/>
						}
					/>
					<Route
						path='/subjects'
						element={
							<Subjects
								table={table}
								userAttendance={userAttendance}
								reqAtt={reqAtt}
							/>
						}
					/>
					<Route
						path='/*'
						element={<NotFound />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
