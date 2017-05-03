import React from "react"; // Responsible to create components.
import ReactDOM from "react-dom"; // React Render Engine.
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Featured from "./pages/Featured.js";
import Favorites from "./pages/Favorites.js";
import Todos from "./pages/Todos.js";
import Layout from "./pages/Layout.js";
import Settings from "./pages/Settings.js";
import Users from "./pages/Users.js";

import userStore from "./stores/UserStore";

const app = document.getElementById('app');
ReactDOM.render(
    <Provider userStore={userStore}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Todos}></IndexRoute>
                <Route path="featured" component={Featured}></Route>
                <Route path="favorites" component={Favorites}></Route>
                <Route path="settings" component={Settings}></Route>
                <Route path="users" component={Users}></Route>
            </Route>
        </Router>
    </Provider>
    , app);
