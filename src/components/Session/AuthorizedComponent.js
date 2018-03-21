import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import { firebase } from '../../firebase';
import { SIGN_IN } from '../../constants/routes';

class AuthorizedComponent extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    sessionStore: PropTypes.object.isRequired
  };

  authCondition = authUser => !!authUser;

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if (!this.authCondition(authUser)) {
        this.props.history.push(SIGN_IN);
      }
    });
  }

  render() {
    const { sessionStore, render, ...props } = this.props;
 
    return sessionStore.authUser && render(props);
  }
}

export default compose(withRouter, inject('sessionStore'), observer)(
  AuthorizedComponent
);
