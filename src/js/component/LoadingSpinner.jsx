import React from "react";

// Import loading spinner (https://github.com/davidhu2000/react-spinners)
import PuffLoader from "react-spinners/PuffLoader";

const LoadingSpinner = () => (
	<div className="loading-spinner-container">
		<div className="loading-spinner">
			<PuffLoader color="#000" size={100} />
		</div>
	</div>
);
export default LoadingSpinner;
