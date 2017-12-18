import { observable, action } from 'mobx';

class UserStore {
  @observable users = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setUsers = users => {
    this.users = users;
  }
}

export default UserStore;