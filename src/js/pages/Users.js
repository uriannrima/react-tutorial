import React from "react";
import { observer, inject } from "mobx-react";

// Get the userStore from the <Provider> outside.
// We could just inject from client.js, but since we use route, we can't do this without looking like:
// this.props.route.userStore
@inject('userStore')
@observer
export default class extends React.Component {
    filter(e) {
        this.props.userStore.filter = e.target.value;
    }

    createNew(e) {
        // Enter
        if (e.which === 13) {
            this.props.userStore.createUser(e.target.value);
            e.target.value = "";
        }
    }

    toggleConfirmed(user) {
        user.confirmed = !user.confirmed;
    }

    render() {
        // Avoid calling functions direct from store...
        // It's just a exemple!
        const { users, filter, filteredUsers, clearConfirmed } = this.props.userStore;
        const mappedUsers = filteredUsers.map(user =>
            <li key={user.id}>
                <input type="checkbox" value={user.confirmed} checked={user.confirmed} onChange={this.toggleConfirmed.bind(this, user)}></input> - {user.name}
            </li>);

        return (
            <div>
                <h1>Users</h1>
                <h3>Made with Mobx and Javascript.</h3>
                <div>
                    Filter: <input type="text" value={filter} onChange={this.filter.bind(this)}></input>
                </div>
                <div>
                    New User: <input type="text" onKeyPress={this.createNew.bind(this)}></input>
                </div>
                <ul>
                    {mappedUsers}
                </ul>
                <a href="#/users" onClick={clearConfirmed}>Clear confirmed!</a>
            </div>
        );
    }
}