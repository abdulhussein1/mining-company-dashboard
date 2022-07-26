/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Col, TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabsData from '../TabsData';
import SCOPE_INSIDE_TABS from './Constants/ScopeInsideConstant';
import RENEWABLE_ENERGY_CONSTANT from './Constants/RenewableEnergyConstant';

const ScopeOneIndex = ({ activeScope }) => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const allTabsLists = [
    [{ s_id: 50, s_data: RENEWABLE_ENERGY_CONSTANT }],
  ];

  return (
    <>
      <div className="scope_inside_parent row d-none">
        <Col sm="12" className="scope_inside_tabs">
          <Nav tabs>
            {SCOPE_INSIDE_TABS.map((item, i) => (
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

      <Col sm="12">
        <TabContent activeTab={activeTab}>
          {allTabsLists.map((items, i) => (
            <>
              {activeTab === String(i + 1)
                ? (
                  <TabPane tabId={String(i + 1)} key={i}>
                    <TabsData tab={activeTab} activeScope={activeScope} StatCombConst={items} />
                  </TabPane>
                )
                : null}
            </>
          ))}
        </TabContent>
      </Col>
    </>
  );
};

ScopeOneIndex.propTypes = {
  activeScope: PropTypes.string.isRequired,
};

export default ScopeOneIndex;
