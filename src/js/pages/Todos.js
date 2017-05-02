import React from "react";
import Todo from "../components/Todo";
import TodoStore from "../stores/TodoStore";
// Every export will be called as TodoAction, so all functions will be inside of it.
import * as TodoActions from "../actions/TodoActions";
import TodoConstants from "../constants/TodoConstants";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            newTodo: {
                text: ""
            },
            todos: TodoStore.getAll()
        };

    }

    // Will render for the FIRST time, and FIRST time only!!!
    // Always remember to release the event after this component is destroyed.
    componentWillMount() {
        // On store change, get all todos again...
        TodoStore.on(TodoConstants.onTodosChange, this.getTodos);
        // console.log("listener count:", TodoStore.listenerCount("change"));
    }

    componentWillUnmount() {
        TodoStore.removeListener(TodoConstants.onTodosChange, this.getTodos);
    }

    getTodos = () => {
        this.setState({
            todos: TodoStore.getAll()
        });
    }

    createTodo = (e) => {
        if (e.type === "keyup" && e.which !== 13) return;
        TodoActions.createTodo(this.state.newTodo.text);
        this.setState({
            newTodo: { text: "" }
        });
    }

    deleteTodo = (e, id) => {
        TodoActions.deleteTodo(id);
    }

    reloadTodos = () => {
        TodoActions.reloadTodos();
    }

    toggleComplete = (e, id) => {
        TodoActions.toggleComplete(id);
    }

    clearCompleted = (e) => {
        TodoActions.clearCompleted();
    }

    updateNewTodo = (e) => {
        //Extract the todo from the state
        var { newTodo } = this.state;

        // Change the value.
        newTodo.text = e.target.value;

        // Change the state.
        this.setState({
            newTodo
        });
    }

    render() {
        const { todos, newTodo } = this.state;
        const TodosComponents = todos.map((todo) => {
            return <Todo key={todo.id} {...todo} onDeleteTodo={this.deleteTodo} onToggleComplete={this.toggleComplete}/>;
        });

        return (
            <div>
                <h1>Todos</h1>
                <input placeholder="Press enter to create..." value={newTodo.text} onChange={this.updateNewTodo} onKeyUp={this.createTodo}></input>
                <button onClick={this.reloadTodos}>Reaload!</button>
                <ul>{TodosComponents}</ul>
                <a href="#" onClick={this.clearCompleted}>Clear completed!</a>
            </div>
        );
    }
}