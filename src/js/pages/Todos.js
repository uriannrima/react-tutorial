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

        this.createTodo = this.createTodo.bind(this);
        this.onTodoTextChange = this.onTodoTextChange.bind(this);
        this.onDeleteTodo = this.onDeleteTodo.bind(this);
    }

    // Will render for the FIRST time, and FIRST time only!!!
    componentWillMount() {
        // On store change, get all todos again...
        TodoStore.on("change", () => {
            this.setState({
                todos: TodoStore.getAll()
            });
        })
    }

    createTodo(e) {
        if (e.type === "keyup" && e.keyCode !== 13) return;
        TodoActions.createTodo(this.state.newTodo.text);
        this.setState({
            newTodo: { text: "" }
        });
    }

    onDeleteTodo(e, id){
        TodoActions.deleteTodo(id);
    }

    onTodoTextChange(e) {
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
            return <Todo key={todo.id} {...todo} onDeleteTodo={this.onDeleteTodo}/>;
        });

        return (
            <div>
                <h1>Todos</h1>
                <input placeholder="Press enter to create..." value={newTodo.text} onChange={this.onTodoTextChange} onKeyUp={this.createTodo}></input>
                <button onClick={this.createTodo}>Create!</button>
                <ul>{TodosComponents}</ul>
            </div>
        );
    }
}