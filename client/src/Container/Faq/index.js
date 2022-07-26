import React, { useState } from 'react';
import {
  Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import classnames from 'classnames';

const Faq = () => {
  const [activeTab, setActiveTab] = useState('2');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm="3" className="mt-5">
            <Col><h4 className="special_font">FAQs</h4></Col>
            <Col className="vertical-tabs mt-4">
              <Nav tabs>
                <NavItem><NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}> Pricing </NavLink></NavItem>
                <NavItem><NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}> General </NavLink></NavItem>
                <NavItem><NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }}> Technical </NavLink></NavItem>
                <NavItem><NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { toggle('4'); }}> Plans </NavLink></NavItem>
                <NavItem><NavLink className={classnames({ active: activeTab === '5' })} onClick={() => { toggle('5'); }}> Projects </NavLink></NavItem>
              </Nav>
            </Col>
          </Col>

          <Col sm="9" className="mt-5 mb-4">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                coming soon..
              </TabPane>

              <TabPane tabId="2">
                <Col sm="6" className="shadow bg-white rounded">
                  <Col className="faq-main-title">FAQs</Col>
                  <Col className="faq-inside p-4">
                    <h3 className="mt-3 mb-3 special_font">General</h3>
                    <Col className="question">
                      <h6 className="mb-2">Who can use Two ocean strategy?</h6>
                      <p>
                        Anyone that is working at project level area and wants to calculate ESG
                        metrics, scenario analysis, comparision or forecast the impact of their
                        project&apos;s non - financial data. To learn how to use our tool please
                        check out the videos or tutorials in help section.
                      </p>
                    </Col>
                    <Col className="question">
                      <h6 className="mb-2">How it is different than other platforms?</h6>
                      <p>
                        This platform gives you data in less than minutes from world’s
                        trusted databases. hence, the accurate ratings of sustainability.
                        In addition you can do much more than just checking the ratings at
                        one single platform by adding team members to creating multiple
                        projects at one single click.
                      </p>
                    </Col>
                    <Col className="question">
                      <h6 className="mb-2">Do i have to put data in order to do calculations of my project?</h6>
                      <p>
                        Yes, you have to put all the mandatory data in order
                        to calculate ratings or comparing projects.
                      </p>
                    </Col>
                    <Col className="question">
                      <h6 className="mb-2">Will making member admin allow them to download projects?</h6>
                      <p>
                        Admins are allowed to add other members as well as edit
                        and downloading the data of projects.
                      </p>
                    </Col>
                    <Col className="question">
                      <h6 className="mb-2">How do i make any memeber admin?</h6>
                      <p>
                        There is an option under your profile “manage team”,
                        you can change the member into admin or given access.
                      </p>
                    </Col>
                  </Col>
                </Col>
              </TabPane>

              <TabPane tabId="3">
                coming soon..
              </TabPane>

              <TabPane tabId="4">
                coming soon..
              </TabPane>

              <TabPane tabId="5">
                coming soon..
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Faq;
