import React from "react"; // Responsible to create components.
import ReactDOM from "react-dom"; // React Render Engine.
import { Provider } from 'mobx-react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./js/pages/Layout";

import userStore from "./js/stores/UserStore";
import featStore from "./ts/stores/FeatStore";

const app = document.getElementById('app');
ReactDOM.render(
    <Provider userStore={userStore} featStore={featStore}>
        <Router>
            <Route path="/" component={Layout} />
        </Router>
    </Provider>
    , app);
