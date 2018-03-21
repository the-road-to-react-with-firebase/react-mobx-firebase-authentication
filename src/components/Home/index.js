import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import AuthorizedComponent from '../Session/AuthorizedComponent';
import { db } from '../../firebase';

class HomePage extends Component {
  componentDidMount() {
    const { userStore } = this.props;

    db.onceGetUsers().then(snapshot =>
      userStore.setUsers(snapshot.val())
    );
  }

  render() {
    const { users } = this.props.userStore;

    return (
      <AuthorizedComponent
        render={() => (
          <div>
            <h1>Home</h1>
            <p>The Home Page is accessible by every signed in user.</p>

            { !!users && <UserList users={users} /> }
          </div>
        )}
      />
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

// const authCondition = (authUser) => !!authUser;

export default compose(
  inject('userStore'),
  observer
)(HomePage);