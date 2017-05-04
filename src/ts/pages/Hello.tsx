import * as React from "react";
import { inject, observer } from "mobx-react";

// React.Component<PropsDefinition, StateDefinition>
// Definition may be a interface, a class, undefined or any.
@inject('userStore')
@observer
export default class extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <h3>This is React/Mobx with Typescript!</h3>
                <h4>{this.props.userStore.filter}</h4>
                <div>
                    <input type="text" onChange={(e) => { this.props.userStore.filter = e.target.value; }}></input>
                </div>
            </div>
        );
    }
}