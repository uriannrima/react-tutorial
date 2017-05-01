import dispatcher from "../dispatcher";

/**
export default {
    createTodo: function() {

    }
}
**/

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