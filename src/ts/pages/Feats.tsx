import * as React from "react";
import { inject, observer } from "mobx-react";
import { FeatStore } from "../stores/FeatStore";

// React.Component<PropsDefinition, StateDefinition>
// Definition may be a interface, a class, undefined or any.
@inject('featStore')
@observer
export default class extends React.Component<{ featStore: FeatStore }, any> {
    render() {
        const { featStore } = this.props;
        const mappedFeats = featStore.filteredFeats.map(feat => <li key={feat.id}>{feat.name} - {feat.description}</li>);

        return (
            <div>
                <h1>Feats</h1>
                <h3>This is a Feat page with React/Mobx with Typescript!</h3>
                <h4>{featStore.filter}</h4>
                <div>
                    <input type="text" onChange={(e) => { featStore.filter = e.currentTarget.value; }}></input>
                </div>
                <div>
                    <input type="text" onKeyPress={(e) => {
                        if (e.key == "Enter") {
                            featStore.createFeat(e.currentTarget.value);
                            e.currentTarget.value = "";
                        }
                    }}></input>
                </div>
                <div>
                    <ul>
                        {mappedFeats}
                    </ul>
                </div>
            </div>
        );
    }
}