import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import AuthorizedComponent from '../Session/AuthorizedComponent';

const AccountPage = ({ sessionStore }) => (
  <AuthorizedComponent
    render={() => (
      <div>
        <h1>Account: {sessionStore.authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  />
);

export default compose(
  inject('sessionStore'),
  observer
)(AccountPage);
