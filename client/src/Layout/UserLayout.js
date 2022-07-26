import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Components/Header';
import Faq from '../Container/Faq/index';
import Tutorials from '../Container/Tutorial-Page';
import CustomerCare from '../Container/Customer-Care';
import Profile from '../Container/Profile';
import PasswordSecurity from '../Container/Password-Security';
import TwoStepPass from '../Container/Password-Security/TwoStepPassword';
import TwoStepPhone from '../Container/Password-Security/TwoStepPhone';
import TwoStepOtp from '../Container/Password-Security/TwoStepOtp';
import Biling from '../Container/Biling';
import ManageTeamData from '../Container/ManageTeam';
import AddMemberForm from '../Container/ManageTeam/AddMember';
import { userUrl } from '../Utils/Config';

const UserLayout = () => (
  <>
    <Header />
    <div className="main-bg without-sidebar">
      <Switch>
        <Route exact path={`${userUrl}/faq`} component={Faq} />
        <Route exact path={`${userUrl}/tutorials`} component={Tutorials} />
        <Route exact path={`${userUrl}/customer-care`} component={CustomerCare} />
        <Route exact path={`${userUrl}/profile`} component={Profile} />
        <Route exact path={`${userUrl}/password-security`} component={PasswordSecurity} />
        <Route exact path={`${userUrl}/biling`} component={Biling} />
        <Route exact path={`${userUrl}/manage-team`} component={ManageTeamData} />
        <Route exact path={`${userUrl}/add-new-member`} component={AddMemberForm} />
        <Route exact path={`${userUrl}/authentication-password`} component={TwoStepPass} />
        <Route exact path={`${userUrl}/send-otp`} component={TwoStepPhone} />
        <Route exact path={`${userUrl}/enter-otp`} component={TwoStepOtp} />
      </Switch>
    </div>
  </>
);
export default UserLayout;
