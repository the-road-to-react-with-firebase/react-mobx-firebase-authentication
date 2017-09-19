import React from 'react';
import { inject } from 'mobx-react';

import { firebase } from '../../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { sessionStore } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? sessionStore.setAuthUser(authUser)
          : sessionStore.setAuthUser(null);
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  return inject('sessionStore')(WithAuthentication);
}

export default withAuthentication;