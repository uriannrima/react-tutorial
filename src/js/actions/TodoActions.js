import dispatcher from "../../dispatcher";
import TodoConstants from "../constants/TodoConstants";

function dispatch(action) {
    dispatcher.dispatch(action);
}

export function createTodo(text) {
    dispatch({
        type: TodoConstants.createTodo,
        text
    });
}

export function deleteTodo(id) {
    dispatch({
        type: TodoConstants.deleteTodo,
        id
    });
}

export function toggleComplete(id) {
    dispatch({
        type: TodoConstants.toggleComplete,
        id
    });
}

export function clearCompleted() {
    dispatch({
        type: TodoConstants.clearCompleted
    });
}

export function reloadTodos() {
    //axios("http://someurl.com/somedataendpoint").then((data) => {
    //
    //});

    dispatcher.dispatch({
        type: TodoConstants.fetchTodos
    });

    setTimeout(() => {
        const receivedData = [
            {
                id: 123123123,
                text: "Done it",
                complete: true
            },
            {
                id: 321321321,
                text: "Done it again",
                complete: false
            }
        ];

        dispatcher.dispatch({
            type: TodoConstants.receiveTodos,
            todos: receivedData
        });

        if (false) {
            const e = new Error("Fake error.");
            dispatcher.dispatch({
                type: TodoConstants.fetchTodosError,
                error: e
            });
        }
    }, 2000);
}