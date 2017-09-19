import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';

const AccountPage = ({ sessionStore }) =>
  <div>
    <h1>Account: {sessionStore.authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

export default compose(
  withAuthorization(true),
  inject('sessionStore'),
  observer
)(AccountPage);