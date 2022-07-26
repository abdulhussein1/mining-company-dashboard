import React, { useState } from 'react';
import {
  Col, TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import MobileCombustionTabs from './MobileCombustionTabs';
import IndustrialProcessTabs from './IndustrialProcessTabs';

const NonCarbonEmissionTabs = () => {
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
                Stationary Combustion
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Mobile Combustion
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggle('3'); }}
              >
                Industrial Processes
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </div>

      <Col sm="12">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            coming soon
          </TabPane>

          <TabPane tabId="2">
            <MobileCombustionTabs />
          </TabPane>

          <TabPane tabId="3">
            <IndustrialProcessTabs />
          </TabPane>
        </TabContent>
      </Col>
    </>
  );
};

export default NonCarbonEmissionTabs;
