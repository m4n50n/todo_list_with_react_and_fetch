import React from "react";
import "./header.css";

export const Header = () => {
	return (
		<div className="row">
			<div className="col-12">
				<h2 className="text-center text-white my-2">
					<i className="fas fa-stream p-3 rounded-circle bg-dark shadow-sm"></i>
				</h2>
				<h1 id="app_title">
					TO-DO List with <strong>React</strong> and{" "}
					<strong>Fetch</strong>
				</h1>
			</div>
		</div>
	);
};
