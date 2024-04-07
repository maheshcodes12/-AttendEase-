import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Timetable from "./pages/Timetable";
import Subjects from "./pages/Subjects";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<Router>
				<Routes>
					<Route
						path='/'
						element={<Homepage />}
					/>
					<Route
						path='/timetable'
						element={<Timetable />}
					/>
					<Route
						path='/subjects'
						element={<Subjects />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
