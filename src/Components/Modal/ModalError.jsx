import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import PropTypes from "prop-types";

const ModalError = (props) => (
	<Modal show={props.show}>
		<Modal.Body className="pt-3 pb-2 bg-dark text-white text-center">
			Ups! an error occurred while processing your request.
		</Modal.Body>

		<Modal.Footer className="justify-content-center border-0 pb-2 bg-dark">
			<Button
				variant="success"
				className="btn-sm shadow-none"
				onClick={() => window.location.reload()}>
				Ok, <strong>reload</strong> the page
			</Button>
		</Modal.Footer>
	</Modal>
);

ModalError.propTypes = {
	show: PropTypes.bool,
};

export default ModalError;
