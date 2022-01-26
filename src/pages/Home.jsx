import React, { useState, useEffect, useRef } from "react";

// Import Styles
import "./home.css";

// Import Components
import { Header } from "../components/Header/Header.jsx";
import { TodoList } from "../components/TodoList/TodoList.jsx";
import { Spinner } from "../components/Spinner/Spinner.jsx";
import { ModalError } from "../components/Modal/ModalError.jsx";

// Import Services
import { ApiGetData, ApiPutData } from "../service/todo-api.js";

const Home = () => {
	// Hooks
	const [TasksList, setTasksList] = useState([]);
	const [InputValue, setInputValue] = useState("");
	const [ShowLoadingSpinner, setShowLoadingSpinner] = useState(false);
	const [ShowErrorModal, setShowErrorModal] = useState(false);

	/**
	 * https://es.reactjs.org/docs/hooks-reference.html#useref
	 * I use this hook because I want to autofocus the task input with useEffect on every component reload
	 * What I want is while a request is fetching, the input is disabled and unfocused, and when the request is done, focus the input again
	 ******* I DONT KNOW IF THIS IS THE RIGHT WAY TO DO IT, BUT IT WORKING
	 */
	const TaskInput = useRef(null);

	// Calls to API
	const CallApiGetData = async () => {
		setShowLoadingSpinner(true);

		await ApiGetData()
			.then((response) => response.json())
			.then((data) => setTasksList(data))
			.catch(() => setShowErrorModal(true));

		setShowLoadingSpinner(false);
	};

	const CallApiPutData = async (Data) => {
		setShowLoadingSpinner(true);

		await ApiPutData(Data)
			.then((response) =>
				response ? CallApiGetData() : setShowErrorModal(true)
			)
			.catch(() => setShowErrorModal(true));

		setShowLoadingSpinner(false);
	};

	// UseEffect hook ([] to execute the code only once - whitout [] the code will be execute on every component render- )
	useEffect(() => CallApiGetData(), []);
	useEffect(() => TaskInput.current.focus());

	// Adding a new task
	const HandleNewTask = () => {
		CallApiPutData(
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

	/**
	 * Finishing and deleting a task
	 * In this function I don't use setTasksList for prevent the component reload before finishing or deleting the task
	 */
	const DoneTask = (IndexToComplete) => {
		const ActualList = [...TasksList];
		ActualList[IndexToComplete].done = !ActualList[IndexToComplete].done;

		CallApiPutData(ActualList);
	};

	const DeleteTask = (IndexToDelete) => {
		const ActualList = [...TasksList];
		ActualList.splice(IndexToDelete, 1);

		// I define this condition because the API not accept a empty array for update data currently
		ActualList.length === 0
			? alert(
					"Sorry! There must be at least one task registered on the server for now."
			  )
			: CallApiPutData(ActualList);
	};

	return (
		<div className="container-fluid">
			<Header />

			<div className="row justify-content-center">
				<div className="todo-wrapper col-11 col-sm-10 col-md-8 col-lg-7 col-xl-5 d-flex flex-column flex-nowrap gap-2 p-2 rounded-3 shadow-lg">
					<div className="input-group">
						<input
							type="text"
							title="Write a new task"
							className="form-control border-0 shadow-sm"
							value={InputValue}
							ref={TaskInput}
							placeholder="Give me a task"
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={(e) =>
								e.key === "Enter" &&
								InputValue.trim().length !== 0
									? HandleNewTask()
									: null
							}
							disabled={ShowLoadingSpinner}
							autoFocus
						/>

						<button
							type="button"
							title="Add task"
							className="input-group-text btn btn-sm btn-dark shadow-sm text-white px-4"
							onClick={() =>
								InputValue.trim().length !== 0
									? HandleNewTask()
									: null
							}>
							<i className="fas fa-share"></i>
						</button>
					</div>

					<TodoList
						TasksList={TasksList}
						DoneTask={DoneTask}
						DeleteTask={DeleteTask}
					/>

					<div className="counter-container d-flex justify-content-between">
						<div>
							Completed:{" "}
							<strong>
								{TasksList.filter((Task) => Task.done).length}
							</strong>
						</div>

						<div>
							Pending:{" "}
							<strong>
								{TasksList.filter((Task) => !Task.done).length}
							</strong>
						</div>
					</div>
				</div>
			</div>

			{ShowLoadingSpinner ? <Spinner /> : null}
			<ModalError show={ShowErrorModal} />
		</div>
	);
};

export default Home;
