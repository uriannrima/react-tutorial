import dispatcher from "../dispatcher";

export function createTodo(text) {
    dispatcher.dispatch({
        type: "CREATE_TODO",
        text
    });
}

export function deleteTodo(id) {
    dispatcher.dispatch({
        type: "DELETE_TODO",
        id
    });
}

export function reloadTodos() {
    //axios("http://someurl.com/somedataendpoint").then((data) => {
    //
    //});

    dispatcher.dispatch({
        type: "FETCH_TODOS"
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
            type: "RECEIVE_TODOS",
            todos: receivedData
        });

        if (false) {
            const e = new Error("Fake error.");
            dispatcher.dispatch({
                type: "FETCH_TODOS_ERROR",
                error: e
            });
        }
    }, 2000);
}