import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Container/Login/index';
import Register from '../Container/Register/index';
import Tutorial from '../Container/Tutorial/index';
import Email from '../Container/Email-Verification/index';
import ForgotPassword from '../Container/ForgotPassword';
import ResetPasswordLink from '../Container/ForgotPassword/ResetPasswordEmail';
import NewPassword from '../Container/ForgotPassword/NewPassword';
import Logout from '../Components/Logout';

const AuthLayout = () => (
  <>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/tutorial" component={Tutorial} />
      <Route exact path="/email-verification" component={Email} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password" component={ResetPasswordLink} />
      <Route exact path="/new-password" component={NewPassword} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
  </>
);
export default AuthLayout;
