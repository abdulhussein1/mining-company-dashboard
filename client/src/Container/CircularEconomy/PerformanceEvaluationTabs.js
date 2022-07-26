import React, { useState } from 'react';
import {
  Col, TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import EnablerTabs from './EnablerTabs';
import OutComeTabs from './OutcomeTabs';

const PerformanceEvaluationTabs = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <>
      <div className="row scope_main_view">
        <Col sm="12" className="scope_tabs">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Enablers
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Outcomes
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </div>

      <Col sm="12">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <EnablerTabs />
          </TabPane>

          <TabPane tabId="2">
            <OutComeTabs />
          </TabPane>
        </TabContent>
      </Col>
    </>
  );
};

export default PerformanceEvaluationTabs;
