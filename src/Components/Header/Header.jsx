import React from "react";

export const Header = () => {
	return (
		<div className="row my-3">
			<div className="col-12">
				<h2 className="text-center text-white mt-1 mb-2">
					<i className="fas fa-stream p-3 rounded-circle bg-dark shadow-sm"></i>
				</h2>
				<h1 className="text-center">
					TO-DO List with <strong>React</strong> and{" "}
					<strong>Fetch</strong>
				</h1>
			</div>
		</div>
	);
};
