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
		<div className="container-fluid">
			<div className="row mt-4 mb-3">
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

			<div className="row justify-content-center">
				<div className="todo-wrapper col-12 col-sm-10 col-md-8 col-lg-7 col-xl-5 d-flex flex-column gap-2 p-2 rounded-3 shadow-lg">
					<div className="input-group">
						<input
							type="text"
							title="Write a new task"
							className="form-control border-0 shadow-sm"
							value={InputValue}
							placeholder="Give me a task"
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={(e) =>
								e.key === "Enter" ? HandleNewTask() : null
							}
							autoFocus
						/>

						<button
							type="button"
							title="Add task"
							className="input-group-text btn btn-sm btn-dark shadow-sm text-white px-3"
							onClick={() => HandleNewTask()}>
							<i className="fas fa-share"></i>
						</button>
					</div>

					<TodoList
						TasksList={TasksList}
						CompleteTask={CompleteTask}
					/>
				</div>
			</div>

			{ShowLoadingSpinner ? <LoadingSpinner /> : null}
			<ModalWindow show={ShowErrorModal} />
		</div>
	);
};

export default Home;
