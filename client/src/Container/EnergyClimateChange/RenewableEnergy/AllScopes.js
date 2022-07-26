/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Col, Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import SCOPES from './Constants/ScopeConstant';
import ScopeOneIndex from './ScopeOne/index';

const ScopeTabs = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <div className="row scope_main_view d-none">
        <Col sm="12" className="scope_tabs">
          <Nav tabs>
            {SCOPES.map((item, i) => (
              <NavItem key={i}>
                <NavLink
                  className={classnames({ active: activeTab === String(i + 1) })}
                  onClick={() => { toggle(String(i + 1)); }}
                >
                  {item.attributes.description}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Col>
      </div>

      <Col sm="12" className="all_tabs_contents">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <ScopeOneIndex activeScope={activeTab} />
          </TabPane>
        </TabContent>
      </Col>
    </>
  );
};

export default ScopeTabs;
