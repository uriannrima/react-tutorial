import React from "react";
import { NavLink } from "react-router-dom";

export default class NavItem extends React.Component {
    constructor() {
        super();
        this.onNavClick = this.onNavClick.bind(this);
    }
    onNavClick(e) {
        this.props.onClick(e);
    }
    render() {
        const { label, pathName, active, onClick } = this.props;
        return (
            <li class={active ? "active" : ""}>
                <NavLink to={pathName} onClick={this.onNavClick}>{label}</NavLink>
            </li>
        );
    }
}