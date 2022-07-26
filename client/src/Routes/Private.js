import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  render: Component, path, auth,
}) => <Route path={path} render={() => (auth ? <Component /> : <Redirect to="/" />)} />;

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.oneOfType([
    PropTypes.shape({ render: PropTypes.func.isRequired }),
    PropTypes.func,
  ]).isRequired,
  auth: PropTypes.string,
};

PrivateRoute.defaultProps = {
  auth: null,
};
export default PrivateRoute;
