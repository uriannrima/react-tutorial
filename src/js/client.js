import React from "react"; // Responsible to create components.
import ReactDOM from "react-dom"; // React Render Engine.
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Featured from "./pages/Featured.js";
import Favorites from "./pages/Favorites.js";
import Todos from "./pages/Todos.js";
import Layout from "./pages/Layout.js";
import Settings from "./pages/Settings.js";

const app = document.getElementById('app');
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Todos}></IndexRoute>
            <Route path="featured" component={Featured}></Route>
            <Route path="favorites" component={Favorites}></Route>
            <Route path="settings" component={Settings}></Route>
        </Route>
    </Router>
    , app);
