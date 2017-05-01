import React from "react";
import { IndexLink, Link } from "react-router";

export default class NavItem extends React.Component {
    constructor() {
        super();
        this.onNavClick = this.onNavClick.bind(this);
    }
    onNavClick(e) {
        this.props.onClick(e);
    }
    render() {
        const { label, pathName, isIndex, active, onClick } = this.props;
        if (isIndex) {
            return (
                <li class={active ? "active" : ""}>
                    <IndexLink to={pathName} onClick={this.onNavClick}>{label}</IndexLink>
                </li>
            );
        }

        return (
            <li class={active ? "active" : ""}>
                <Link to={pathName} onClick={this.onNavClick}>{label}</Link>
            </li>
        );
    }
}