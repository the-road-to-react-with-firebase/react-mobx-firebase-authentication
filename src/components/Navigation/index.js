import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import SignOutButton from '../SignOut';

const Navigation = ({ sessionStore }) =>
  <div>
    { sessionStore.authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
  <ul>
    <li><Link to="/">Landing</Link></li>
    <li><Link to="/home">Home</Link></li>
    <li><Link to="/account">Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to="/">Landing</Link></li>
    <li><Link to="/signin">Sign In</Link></li>
  </ul>

export default compose(
  inject('sessionStore'),
  observer
)(Navigation);
