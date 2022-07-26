import React, { useState } from 'react';
import {
  Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from '../Container/Register/redux/action';
import {
  Hamburger, WhiteLogo, BlackLayout, Notification, Question, UserIcon,
} from './common';
import { userUrl, portalUrl } from '../Utils/Config';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [dropdownOpen3, setDropdownOpen3] = useState(false);
  const toggle1 = () => setDropdownOpen1((prevState) => !prevState);
  const toggle2 = () => setDropdownOpen2((prevState) => !prevState);
  const toggle3 = () => setDropdownOpen3((prevState) => !prevState);

  const hideHamburger = window.location.pathname.match(`${userUrl}`) ? 'd-none' : '';
  const hideMenuAndHamburger = window.location.pathname.match(`${portalUrl}/dashboard`) ? 'd-none' : '';

  const logout = () => {
    localStorage.removeItem('appState');
    dispatch(logoutUser());
    history.push('/logout');
  };

  return (
    <Col className="header-bg d-flex align-items-center">
      <Container className="themed-container" fluid>
        <Row>
          <Col xs="12" md="6" className="left-header d-flex align-items-center">
            <div className={`${hideMenuAndHamburger} d-flex w-100`}>
              <div className={`${hideHamburger} hamburger me-4`}><Button><Hamburger /></Button></div>
              <div className="logo me-4"><Link to={`${portalUrl}/dashboard`}><WhiteLogo /></Link></div>
            </div>
          </Col>

          <Col xs="12" md="6" className="right-header d-flex align-items-center justify-content-end">
            <div className="black-layout line-height-initial">
              <Button className="default-cta">
                <BlackLayout />
              </Button>
            </div>

            <div className="notification line-height-initial mx-4">
              <Dropdown isOpen={dropdownOpen3} toggle={toggle3}>
                <DropdownToggle caret className="default-cta new-notification"><Notification /></DropdownToggle>
                <DropdownMenu right>
                  <h5>Notification</h5>
                  <p>
                    There are no notifications yet,  we will notify you here when
                    there is something new
                  </p>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="question line-height-initial">
              <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                <DropdownToggle caret className="default-cta"><Question /></DropdownToggle>
                <DropdownMenu right>
                  <Link to={`${userUrl}/faq`}>FAQs</Link>
                  <Link to={`${userUrl}/tutorials`}>Tutorials</Link>
                  <Link to={`${userUrl}/customer-care`}>Customer Care</Link>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="user line-height-initial ms-5">
              <Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
                <DropdownToggle caret className="default-cta"><UserIcon /></DropdownToggle>
                <DropdownMenu right>
                  <Link to={`${userUrl}/profile`}>Profile</Link>
                  <Link to={`${userUrl}/biling`}>Billing</Link>
                  <Link to={`${userUrl}/manage-team`}>Manage Team</Link>
                  <Link to={`${userUrl}/password-security`}>Password &amp; Security</Link>
                  <Button onClick={logout}>Logout</Button>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default Header;
