import React, { useState } from 'react';
import {
  Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { userUrl } from '../../Utils/Config';

const Tutorials = () => {
  const [activeTab, setActiveTab] = useState('2');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm="3" className="mt-5 ">
            <div><h4 className="special_font">Videos</h4></div>
            <div className="vertical-tabs mt-4">
              <Nav tabs>
                <NavItem><NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}> Introduction </NavLink></NavItem>
                <NavItem><NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}> How to use this tool? </NavLink></NavItem>
                <NavItem><NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }}> Different services </NavLink></NavItem>
              </Nav>
            </div>
          </Col>

          <Col sm="9" className="mt-5 ">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                coming soon..
              </TabPane>

              <TabPane tabId="2">
                <Col sm="9" className="shadow bg-white p-4 rounded">
                  <iframe width="100%" height="500" src="https://www.youtube.com/embed/btmjDyff6E8" title="YouTube video player" />
                  <div className="text-center mt-3"><Link to={`${userUrl}/tutorials`} className="btn btn-secondary custom_cta px-4">Next</Link></div>
                </Col>
              </TabPane>

              <TabPane tabId="3">
                coming soon..
              </TabPane>
            </TabContent>
          </Col>

        </Row>
      </Container>
    </>
  );
};

export default Tutorials;
