import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export const NotFound = () => {
	return (
		<div>
			NotFound
			<div>
				<Link to='/'>Go back</Link>
			</div>
			<Footer />
		</div>
	);
};
