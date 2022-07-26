/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Components/Header';
import Dashboard from '../Container/Dashboard/index';
import { portalUrl, projectUrl } from '../Utils/Config';
import ProjectLayout from './ProjectLayout';

const AdminLayout = () => {
  const fullWidthPanel = window.location.pathname.match('dashboard') ? 'without-sidebar' : '';
  return (
    <>
      <Header />
      <div className={`${fullWidthPanel} main-bg`}>
        <Switch>
          <Route exact path={`${portalUrl}/dashboard`} component={Dashboard} />
          <Route path={`${portalUrl}/${projectUrl}/:projectId`} render={({ match: { url } }) => <ProjectLayout url={url} />} />
        </Switch>
      </div>
    </>
  );
};

export default AdminLayout;
