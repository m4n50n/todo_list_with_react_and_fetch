import React from "react";
import PropTypes from "prop-types";

const TodoList = (props) => {
	return (
		<div className="row justify-content-center mx-2">
			<div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-5 d-flex flex-column p-0">
				{props.TasksList.map((Task, TaskIndex) => (
					<div
						key={TaskIndex}
						className={`task d-flex align-items-center rounded-3 mb-2 py-1 ps-2 pe-3 shadow-sm ${
							Task.done ? "completed" : ""
						}`}>
						<div className="form-check ms-2">
							<input
								type="checkbox"
								title="Mark as completed"
								className="form-check-input ps-2 shadow-none"
								onClick={() => props.CompleteTask(TaskIndex)}
								defaultChecked={Task.done}
							/>
						</div>

						<span className="ps-1 pe-2">{Task.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};

TodoList.propTypes = {
	TasksList: PropTypes.array,
	DeleteTask: PropTypes.func,
	CompleteTask: PropTypes.func,
};

export default TodoList;
