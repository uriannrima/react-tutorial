import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import * as Utils from "../utils";
import TodoConstants from "../constants/TodoConstants";

class TodoStore extends EventEmitter {
    constructor() {
        super();
        this.todos = [];
        this.handleActions = this.handleActions.bind(this);
    }

    handleActions(action) {
        switch (action.type) {
            case TodoConstants.createTodo:
                this.createTodo(action.text);
                break;
            case TodoConstants.deleteTodo:
                this.deleteTodo(action.id);
                break;
            case TodoConstants.receiveTodos:
                this.receiveTodos(action.todos);
                break;
            case TodoConstants.toggleComplete:
                this.toggleComplete(action.id);
                break;
            case TodoConstants.clearCompleted:
                this.clearCompleted();
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

        this.emitChange();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => {
            return todo.id !== id;
        });

        this.emitChange();
    }

    receiveTodos(todos) {
        this.todos = todos;
        this.emitChange();
    }

    toggleComplete(id) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) todo.complete = !todo.complete;
            return todo;
        });

        this.emitChange();
    }

    clearCompleted() {
        this.todos = this.todos.filter((todo) => !todo.complete);
        this.emitChange();
    }

    emitChange(){
        this.emit(TodoConstants.onTodosChange);
    }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions);
export default todoStore;