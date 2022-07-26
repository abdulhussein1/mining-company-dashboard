import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import AuthLayout from './Layout/AuthLayout';
import AdminLayout from './Layout/AdminLayout';
import UserLayout from './Layout/UserLayout';
import { portalUrl, userUrl } from './Utils/Config';
import './App.css';
import PrivateRoute from './Routes/Private';
import PublicRoute from './Routes/Public';

function App() {
  const auth = useSelector((state) => state.registerReducer.userToken);

  return (
    <div className="App">
      <Router>
        <PublicRoute path="/" auth={auth} render={() => <AuthLayout />} />
        <PrivateRoute path={portalUrl} auth={auth} render={() => <AdminLayout />} />
        <PrivateRoute path={userUrl} auth={auth} render={() => <UserLayout />} />
      </Router>
      <Toaster />
    </div>
  );
}
export default connect()(App);
