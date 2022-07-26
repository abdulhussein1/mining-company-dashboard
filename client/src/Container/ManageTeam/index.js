import React, { useState } from 'react';
import {
  Container, TabContent, TabPane, Nav, NavItem, NavLink, Col,
} from 'reactstrap';
import classnames from 'classnames';
import TeamMember from './TeamMember';

const ManageTeamData = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>

      <Col className="LoginPage d-flex pt-5 pb-5 h-auto">
        <Container>
          <Col sm="12" className="shadow bg-white rounded overflow-hidden">
            <Col className="faq-main-title">Manage team</Col>

            <Col className="faq-inside manage_team_list p-4">
              <Nav tabs>
                <NavItem><NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>Member (2)</NavLink></NavItem>
                <NavItem><NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>Admin (1)</NavLink></NavItem>
                <NavItem><NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }}>Deleted (0)</NavLink></NavItem>
              </Nav>
            </Col>

            <TabContent activeTab={activeTab} className="manage-team-tabs">
              <TabPane tabId="1">
                <TeamMember />
              </TabPane>

              <TabPane tabId="2">
                <Col className="p-4">coming soon...</Col>
              </TabPane>

              <TabPane tabId="3">
                <Col className="p-4">coming soon...</Col>
              </TabPane>
            </TabContent>

          </Col>
        </Container>
      </Col>

    </>
  );
};

export default ManageTeamData;
