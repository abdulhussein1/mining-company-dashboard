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
import STATIONARY_COMBUSTION from './Constants/StationaryConstant';
import TRANSPORTATION_ONE from './Constants/TransportationOne';
import TRANSPORTATION_TWO from './Constants/TransportationTwo';
import FUGITIVE_EMISSION from './Constants/FugitiveEmissionConstant';
import PROCESS_EMISSION from './Constants/ProcessEmissionConstant';

const ScopeOneIndex = ({ activeScope }) => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const allTabsLists = [
    [{ s_id: 1, s_data: STATIONARY_COMBUSTION }],
    [{ s_id: 2, s_data: TRANSPORTATION_ONE, s_name: 'Transport Method 1' }, { s_id: 3, s_data: TRANSPORTATION_TWO, s_name: 'Transport Method 2' }],
    [{ s_id: 4, s_data: FUGITIVE_EMISSION }],
    [{ s_id: 5, s_data: PROCESS_EMISSION }],
  ];

  return (
    <>
      <div className="scope_inside_parent row">
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
