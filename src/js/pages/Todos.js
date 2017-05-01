import React from "react";
import Todo from "../components/Todo";
import TodoStore from "../stores/TodoStore";
// Every export will be called as TodoAction, so all functions will be inside of it.
import * as TodoActions from "../actions/TodoActions";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            newTodo: {
                text: ""
            },
            todos: TodoStore.getAll()
        };

        this.getTodos = this.getTodos.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.onTodoTextChange = this.updateNewTodo.bind(this);
        this.onDeleteTodo = this.deleteTodo.bind(this);
        this.reloadTodos = this.reloadTodos.bind(this);
    }

    // Will render for the FIRST time, and FIRST time only!!!
    // Always remember to release the event after this component is destroyed.
    componentWillMount() {
        // On store change, get all todos again...
        TodoStore.on("change", this.getTodos);
        console.log("listener count:", TodoStore.listenerCount("change"));
    }

    componentWillUnmount() {
        TodoStore.removeListener("change", this.getTodos);
    }

    getTodos() {
        this.setState({
            todos: TodoStore.getAll()
        });
    }

    createTodo(e) {
        if (e.type === "keyup" && e.keyCode !== 13) return;
        TodoActions.createTodo(this.state.newTodo.text);
        this.setState({
            newTodo: { text: "" }
        });
    }

    deleteTodo(e, id) {
        TodoActions.deleteTodo(id);
    }

    reloadTodos() {
        TodoActions.reloadTodos();
    }

    updateNewTodo(e) {
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
            return <Todo key={todo.id} {...todo} onDeleteTodo={this.deleteTodo} />;
        });

        return (
            <div>
                <h1>Todos</h1>
                <input placeholder="Press enter to create..." value={newTodo.text} onChange={this.updateNewTodo} onKeyUp={this.createTodo}></input>
                <button onClick={this.reloadTodos}>Reaload!</button>
                <ul>{TodosComponents}</ul>
            </div>
        );
    }
}