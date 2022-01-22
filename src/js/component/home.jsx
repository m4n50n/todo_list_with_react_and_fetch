import React, { useState, useEffect } from "react";
import TodoList from "./TodoList.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import ModalWindow from "./ModalWindow.jsx";

import {
	ApiGetTasks,
	ApiAddTask,
	ApiCompleteTask,
} from "../../service/todo-api.js";

const Home = () => {
	// Hooks
	const [ShowLoadingSpinner, setShowLoadingSpinner] = useState(false);
	const [ShowErrorModal, setShowErrorModal] = useState(false);
	const [TasksList, setTasksList] = useState([]);
	const [InputValue, setInputValue] = useState("");

	// Calls to API
	const CallApiGetTasks = async () => {
		// Get all todos from the database with fetch
		setShowLoadingSpinner(true);

		await ApiGetTasks()
			.then((response) => response.json())
			.then((data) => setTasksList(data))
			.catch((error) => setShowErrorModal(true));

		setShowLoadingSpinner(false);
	};

	const CallApiAddTask = async (Task) => {
		setShowLoadingSpinner(true);

		await ApiAddTask(Task)
			.then((response) =>
				response ? CallApiGetTasks() : setShowErrorModal(true)
			)
			.catch((error) => setShowErrorModal(true));

		setShowLoadingSpinner(false);
	};

	const CallApiCompleteTask = async (Tasks) => {
		setShowLoadingSpinner(true);

		await ApiCompleteTask(Tasks)
			.then((response) =>
				response ? CallApiGetTasks() : setShowErrorModal(true)
			)
			.catch((error) => setShowErrorModal(true));

		setShowLoadingSpinner(false);
	};

	// UseEffect hook ([] to execute the code only once - whitout [] the code will be execute on every component render- )
	useEffect(() => CallApiGetTasks(), []);

	// Adding new task
	const HandleNewTask = () => {
		setShowLoadingSpinner(true);

		CallApiAddTask(
			InputValue.length === 0
				? [...TasksList]
				: [
						...TasksList,
						{
							label: InputValue,
							done: false,
						},
				  ]
		);

		setInputValue("");
	};

	// Completing task
	const CompleteTask = (IndexToComplete) => {
		CallApiCompleteTask(
			/* In this mapping I don't use setTasksList for prevent the component reload before the task has been mark as done  */
			TasksList.map((Task, TaskIndex) =>
				TaskIndex === IndexToComplete
					? { ...Task, done: !Task.done }
					: { ...Task }
			)
		);
	};

	return (
		<div className="container-fluid p-0">
			<div className="row mt-4 mb-3">
				<div className="col-12">
					<p className="h1 text-center mt-1 mb-3">
						<i className="fas fa-tasks"></i>
					</p>
					<h1 className="text-center">TO-DO with React and Fetch</h1>
				</div>
			</div>

			<div className="row flex-wrap justify-content-center align-items-center gap-2 mb-5 mx-2">
				<div className="col-12 col-sm-6 col-md-6 col-xl-3 p-0">
					<input
						type="text"
						title="Write a new task"
						className="form-control border-0 shadow-sm"
						value={InputValue}
						placeholder="Write a new task"
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e) =>
							e.key === "Enter" ? HandleNewTask() : null
						}
						autoFocus
					/>
				</div>

				<div className="col-12 col-sm-auto p-0">
					<button
						type="button"
						title="Add task"
						className="btn btn-dark w-100 shadow-sm text-white"
						onClick={() => HandleNewTask()}>
						<span className="d-sm-none pe-2">
							<strong>SEND</strong> TASK
						</span>
						<i className="fas fa-share"></i>
					</button>
				</div>
			</div>

			<TodoList TasksList={TasksList} CompleteTask={CompleteTask} />

			{ShowLoadingSpinner ? <LoadingSpinner /> : null}
			<ModalWindow show={ShowErrorModal} />
		</div>
	);
};

export default Home;
