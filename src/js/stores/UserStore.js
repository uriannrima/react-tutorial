import { autorun, observable, computed } from "mobx";
import * as Utils from "../utils";

class User {
    @observable id;
    @observable name;
    @observable confirmed;

    constructor(name) {
        this.name = name;
        this.id = Utils.generateGuid();
        this.confirmed = false;
    }
}

class UserStore {
    @observable users = []
    @observable filter = ""

    // Computed are only (re)generated if any of the observables that it uses was changed.
    @computed get filteredUsers() {
        var matchesFilter = new RegExp(this.filter, "i");
        return this.users.filter(user => !this.filter || matchesFilter.test(user.name));
    }

    createUser(name) {
        this.users.push(new User(name));
    }

    clearConfirmed = () => {
        // Can't be done!
        // this.users = [];
        const unconfirmedUsers = this.users.filter(user => !user.confirmed);
        this.users.replace(unconfirmedUsers);
    }
}

var userStore = window.userStore = new UserStore;
export default userStore;

// Only for debug.
// autorun(() => {
//     console.log("Users:", userStore.users[0]);
//     console.log("Filter:", userStore.filter);
// });