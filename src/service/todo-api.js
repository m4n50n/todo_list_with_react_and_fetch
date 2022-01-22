/**
 * Methods are received by the server
 * In this API:
 * - POST: create user (sending empty array [])
 * - PUT: update todo list tasks
 * - GET: for get all data
 * - DELETE: delete user and all created tasks
 */

const ApiGetTasks = async () => {
	try {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR",
			{ method: "GET" }
		);

		return response.ok ? response : false;
	} catch (error) {
		console.error("ApiGetTasks() - Catch error", error);
		return false;
	}
};

const ApiAddTask = async (Tasks) => {
	try {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR",
			{
				method: "PUT",
				body: JSON.stringify(Tasks), // Convert array / object to a JSON string (api-required value format)
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return response.ok ? response : false;
	} catch (error) {
		console.error("ApiAddTask() - Catch error", error);
		return false;
	}
};

const ApiCompleteTask = async (Tasks) => {
	try {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR",
			{
				method: "PUT",
				body: JSON.stringify(Tasks), // Convert array / object to a JSON string (api-required value format)
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return response.ok ? response : false;
	} catch (error) {
		console.error("ApiCompleteTask() - Catch error", error);
		return false;
	}
};

export { ApiGetTasks, ApiAddTask, ApiCompleteTask };
