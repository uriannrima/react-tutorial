import React from "react";
import { Route, Link } from "react-router-dom";

import Todos from "./Todos";
import Featured from "./Featured";
import Favorites from "./Favorites";
import Settings from "./Settings";
import Users from "./Users";
import Feats from "../../ts/pages/Feats";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

export default class extends React.Component {
    render() {
        const { location, history } = this.props;
        const containerStyle = {
            marginTop: "60px"
        };

        return (
            <div>
                <Nav location={location} />
                <div class="container" style={containerStyle}>
                    <div class="row">
                        <div class="col-lg-12">
                            <Route exact path="/" component={Todos}></Route>
                            <Route exact path="/featured" component={Featured}></Route>
                            <Route exact path="/favorites" component={Favorites}></Route>
                            <Route exact path="/settings" component={Settings}></Route>
                            <Route exact path="/users" component={Users}></Route>
                            <Route path="/feats" component={Feats}></Route>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}