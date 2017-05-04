import React from "react";
import NavItem from "./nav/NavItem";

export default class extends React.Component {
    constructor() {
        super()
        this.state = {
            collapsed: true,
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.isNavItemActive = this.isNavItemActive.bind(this);
    }

    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed });
    }

    isNavItemActive(query) {
        const { location } = this.props;
        if (location.pathname === query) return true;
        const regex = new RegExp("^\/" + query)
        return regex.test(location.pathname);
    }

    render() {
        const { collapsed } = this.state;
        const navClass = collapsed ? "collapse" : "";

        const NavItens = [
            { query: "/", label: "Todos", isIndex: true },
            { query: "users", label: "Users" },
            { query: "featured", label: "Featured" },
            { query: "favorites", label: "Favorites" },
            { query: "settings", label: "Settings" },
            { query: "hello", label: "Hello" }
        ].map((navItem, arrayIndex) => {
            return <NavItem
                isIndex={navItem.isIndex}
                key={arrayIndex}
                active={this.isNavItemActive(navItem.query)}
                pathName={navItem.query}
                label={navItem.label}
                onClick={this.toggleCollapse}>
            </NavItem>
        });

        return (
            <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" onClick={this.toggleCollapse} >
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            {NavItens}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}