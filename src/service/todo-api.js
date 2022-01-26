/**
 * Methods are received by the API server
 * - POST: create user (sending empty array [])
 * - GET: for get all data
 * - PUT: update todo list tasks
 * - DELETE: delete user and all created tasks
 */
export const ApiGetData = async () => {
	try {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/joseclementegarciarodriguez",
			{ method: "GET" }
		);

		return response.ok ? response : false;
	} catch (error) {
		console.error("ApiGetData() - Catch error", error);
		return false;
	}
};

export const ApiPutData = async (Data) => {
	try {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/joseclementegarciarodriguez",
			{
				method: "PUT",
				body: JSON.stringify(Data), // Convert array / object to a JSON string (api-required value format)
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return response.ok ? response : false;
	} catch (error) {
		console.error("ApiPutData() - Catch error", error);
		return false;
	}
};
