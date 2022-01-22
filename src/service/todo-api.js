/* POST for user creation / PUT for todolist update / GET for get data / DELETE for delete todolist */
const GetTodos = () =>
	fetch("https://assets.breatheco.de/apis/fake/todos/user/ricardo", {
		method: "GET",
	});
const AddTodo = () =>
	fetch("https://assets.breatheco.de/apis/fake/todos/user/ricardo", {
		method: "PUT",
		body: JSON.stringify(),
		headers: {
			"Content-Type": "application/json",
		},
	});
const RemoveTodo = () =>
	fetch("https://assets.breatheco.de/apis/fake/todos/user/ricardo", {
		method: "DELETE",
	});

export { GetTodos, AddTodo, RemoveTodo };
