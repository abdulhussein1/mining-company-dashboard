import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { portalUrl } from '../Utils/Config';

const PublicRoute = ({
  render: Component, path, auth,
}) => <Route path={path} render={() => (!auth ? <Component /> : <Redirect to={`${portalUrl}/dashboard`} />)} />;

PublicRoute.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.oneOfType([
    PropTypes.shape({ render: PropTypes.func.isRequired }),
    PropTypes.func,
  ]).isRequired,
  auth: PropTypes.string,
};

PublicRoute.defaultProps = {
  auth: null,
};
export default PublicRoute;
