import * as React from "react";
import { inject, observer } from "mobx-react";

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
@inject('userStore')
@observer
export default class extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <h3>This was written with Typescript!!! Awsome!</h3>
                <h4>{this.props.userStore.filter}</h4>
            </div>
        );
    }
}