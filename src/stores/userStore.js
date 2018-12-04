import { observable, action, computed } from 'mobx';

class UserStore {
  @observable users = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setUsers = users => {
    this.users = users;
  };

  @action setUser = (user, uid) => {
    if (!this.users) {
      this.users = {};
    }

    this.users[uid] = user;
  };

  @computed get userList() {
    return Object.keys(this.users || {}).map(key => ({
      ...this.users[key],
      uid: key,
    }));
  }
}

export default UserStore;
