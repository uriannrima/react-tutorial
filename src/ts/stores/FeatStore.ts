import { observable, computed } from "mobx";
import * as utils from "utils";

class Feat {
    @observable id: string;
    @observable name: string;
    @observable description: string;

    constructor(name: string, description: string = "Lorem ipsum...") {
        this.name = name;
        if (description) this.description = description;
        this.id = utils.generateGuid();
    }
}

export class FeatStore {
    @observable feats: Feat[] = [];
    @observable filter: string = "";

    // Computed are only (re)generated if any of the observables that it uses was changed.
    @computed get filteredFeats(): Feat[] {
        var matchesFilter = new RegExp(this.filter, "i");
        return this.feats.filter(feat => !this.filter || matchesFilter.test(feat.name));
    }

    createFeat(name: string) {
        this.feats.push(new Feat(name));
    }
}

var featStore = (<any>window).featStore = new FeatStore;
export default featStore;