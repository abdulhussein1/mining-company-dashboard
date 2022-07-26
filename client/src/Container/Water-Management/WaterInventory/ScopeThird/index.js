/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Col, TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SCOPE_INSIDE_TABS from './Constants/ScopeInsideConstant';
import TabsData from '../TabsData';
import FUEL_AND_ENERGY_ONE from './Constants/FuelAndEnergyOneConstant';
import FUEL_AND_ENERGY_TWO from './Constants/FuelAndEnergyTwoConstant';

const ScopeThirdIndex = ({ activeScope }) => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const allTabsLists = [
    [
      {
        s_id: 31,
        s_data: FUEL_AND_ENERGY_ONE,
        s_name: 'Whether do you want to report water consumption based on data entered in water withdrawal and discharge sections?',
        s_check: 'check',
      },
      { s_id: 32, s_data: FUEL_AND_ENERGY_TWO, s_name: 'Water Storage' },
    ],
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

ScopeThirdIndex.propTypes = {
  activeScope: PropTypes.string.isRequired,
};

export default ScopeThirdIndex;
