import React from "react";
import PropTypes from "prop-types";

const TodoList = (props) => {
	return props.TasksList.map((Task, TaskIndex) => (
		<div
			key={TaskIndex}
			className={`task d-flex justify-content-between align-items-center rounded-1 py-1 ps-2 pe-3 shadow-sm ${
				Task.done ? "completed" : ""
			}`}>
			<div className="form-check ms-2">
				<input
					type="checkbox"
					title="Mark as completed"
					className="form-check-input ps-2 shadow-none"
					onChange={() => props.DoneTask(TaskIndex)}
					checked={Task.done ? "checked" : ""}
				/>
			</div>

			<span className="flex-grow-1 px-2">{Task.label}</span>

			<span
				title="Delete task"
				className="delete-task-button text-danger"
				onClick={() => props.DeleteTask(TaskIndex)}>
				<i className="fas fa-times"></i>
			</span>
		</div>
	));
};

TodoList.propTypes = {
	TasksList: PropTypes.array,
	DoneTask: PropTypes.func,
	DeleteTask: PropTypes.func,
};

export default TodoList;
