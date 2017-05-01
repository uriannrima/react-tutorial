import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
    constructor() {
        super();
        this.todos = [
            {
                id: "6087095d-cc39-438f-b363-042329492bd8",
                text: "Learn React",
                complete: false
            },
            {
                id: "52a391ce-4cf8-44d4-90e8-93411df85c31",
                text: "Git Gud!",
                complete: false
            }
        ];
    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE_TODO": {
                this.createTodo(action.text);
            }
        }
    }

    getAll() {
        return this.todos;
    }

    createTodo(text) {
        this.todos.push({
            id: Date.now(),
            text,
            complete: false
        });

        this.emit("change");
    }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions.bind(todoStore));
window.dispatcher = dispatcher;
export default todoStore;