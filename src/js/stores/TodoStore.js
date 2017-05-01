import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import * as Utils from "../utils";

class TodoStore extends EventEmitter {
    constructor() {
        super();
        this.todos = [];
        this.handleActions = this.handleActions.bind(this);
    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE_TODO":
                this.createTodo(action.text);
                break;
            case "DELETE_TODO":
                this.deleteTodo(action.id);
                break;
        }
    }

    getAll() {
        return this.todos;
    }

    createTodo(text) {
        this.todos.push({
            id: Utils.generateGuid(),
            text,
            complete: false
        });

        this.emit("change");
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => {
            return todo.id !== id;
        });

        this.emit("change");
    }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions);
export default todoStore;