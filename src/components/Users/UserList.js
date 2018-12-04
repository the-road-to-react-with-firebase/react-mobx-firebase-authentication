import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.props.userStore.userList.length) {
      this.setState({ loading: true });
    }

    this.props.firebase.users().on('value', snapshot => {
      this.props.userStore.setUsers(snapshot.val());

      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const users = this.props.userStore.userList;
    const { loading } = this.state;

    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default compose(
  withFirebase,
  inject('userStore'),
  observer,
)(UserList);
