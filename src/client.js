import React from "react"; // Responsible to create components.
import ReactDOM from "react-dom"; // React Render Engine.
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Featured from "./js/pages/Featured";
import Favorites from "./js/pages/Favorites";
import Todos from "./js/pages/Todos";
import Layout from "./js/pages/Layout";
import Settings from "./js/pages/Settings";
import Users from "./js/pages/Users";
import Hello from "./ts/pages/Hello";

import userStore from "./js/stores/UserStore";

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
                <Route path="hello" component={Hello}></Route>
            </Route>
        </Router>
    </Provider>
    , app);
