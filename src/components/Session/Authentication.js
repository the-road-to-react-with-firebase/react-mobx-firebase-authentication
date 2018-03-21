import { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';

import { firebase } from '../../firebase';

class Authentication extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    sessionStore: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { sessionStore } = this.props;

    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? sessionStore.setAuthUser(authUser)
        : sessionStore.setAuthUser(null);
    });
  }

  render() {
    const { render, ...props } = this.props;
    
    return this.props.render(props)
  }
}

export default inject('sessionStore')(Authentication);