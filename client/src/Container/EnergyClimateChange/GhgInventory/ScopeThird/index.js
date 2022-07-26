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
import PURCHASE_GOOD_ONE from './Constants/PurchaseGoodOneConstant';
import PURCHASE_GOOD_TWO from './Constants/PurchaseGoodTwoConstant';
import CAPITAL_GOODS from './Constants/CapitalGoodsConstant';
// import FUEL_AND_ENERGY_ONE from './Constants/FuelAndEnergyOneConstant';
// import FUEL_AND_ENERGY_TWO from './Constants/FuelAndEnergyTwoConstant';
import UPSTREAM_TRANSPORT_ONE from './Constants/UpstreamTransportOneConstant';
import UPSTREAM_TRANSPORT_TWO from './Constants/UpstreamTransportTwoConstant';
import UPSTREAM_TRANSPORT_THREE from './Constants/UpstramTransportThreeConstant';
import BUSINESS_TRAVEL from './Constants/BusinessTravelConstant';
import WASTE_GENERATED from './Constants/WasteGeneratedConstant';
import EMPLOYEE_COMUTING_ONE from './Constants/EmployeeComutingOneConstant';
import EMPLOYEE_COMUTING_TWO from './Constants/EmployeeComutingTwoConstant';
import UPSTREAM_LEASED from './Constants/UpstreamLeaseConstant';
import DOWNSTREAM_TRANSPORT_ONE from './Constants/DownstreamTransportOneConstant';
import DOWNSTREAM_TRANSPORT_TWO from './Constants/DownstreamTransportTwoConstant';
import DOWNSTREAM_TRANSPORT_THREE from './Constants/DownstreamTransportThreeConstant';
import PROCESS_OF_SOLID from './Constants/ProcessOfSolidConstant';
import USE_OF_SOLD_PRODUCTS from './Constants/UseOfSoldConstant';
import END_OF_LIFE_TREATMENT from './Constants/EndOfLifeTreatmentConstant';
import DOWNSTREAM_LEASED_ASSETS from './Constants/DownstreamLeasedConstant';
import FRANCHISES from './Constants/FranchisesConstant';
import INVESTMENTS from './Constants/InvestmentsConstant';
import STATIONARY_COMBUSTION from '../ScopeOne/Constants/StationaryConstant';
import TRANSPORTATION_ONE from '../ScopeOne/Constants/TransportationOne';
import TRANSPORTATION_TWO from '../ScopeOne/Constants/TransportationTwo';
import TRANSPORTATION_THREE from '../ScopeOne/Constants/TransporationThree';

const ScopeThirdIndex = ({ activeScope }) => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const allTabsLists = [
    [{ s_id: 7, s_data: PURCHASE_GOOD_ONE, s_name: 'Purchased Goods' }, { s_id: 8, s_data: PURCHASE_GOOD_TWO, s_name: 'Purchased Services' }],
    [{ s_id: 9, s_data: CAPITAL_GOODS }],
    [
      {
        s_id: 1, s_data: STATIONARY_COMBUSTION, s_name: 'Stationary combustion', only_view: 'only_view',
      },
      {
        s_id: 2, s_data: TRANSPORTATION_ONE, s_name: 'Road Transport -- Transportation Method - 1 (if fuel data is available)', only_view: 'only_view',
      },
      {
        s_id: 3, s_data: TRANSPORTATION_TWO, s_name: 'Road Transport -- Transportation Method - 2 (if distance travelled data is available)', only_view: 'only_view',
      },
      {
        s_id: 51, s_data: TRANSPORTATION_THREE, s_name: 'Non-Road Mobile Machinery', only_view: 'only_view',
      },
    ],
    // [{ s_id: 10, s_data: FUEL_AND_ENERGY_ONE, s_name: 'Stationary combustion' }, { s_id: 11, s_data: FUEL_AND_ENERGY_TWO, s_name: 'Mobile combustion' }],
    [{ s_id: 12, s_data: UPSTREAM_TRANSPORT_ONE, s_name: 'Road Transport -- Transportation Method - 1 (if fuel data is available)' }, { s_id: 13, s_data: UPSTREAM_TRANSPORT_TWO, s_name: 'Road Transport -- Transportation Method - 2 (if distance travelled data is available)' }, { s_id: 14, s_data: UPSTREAM_TRANSPORT_THREE, s_name: 'Other means of transportation' }],
    [{ s_id: 18, s_data: WASTE_GENERATED }],
    [{ s_id: 19, s_data: BUSINESS_TRAVEL }],
    [{ s_id: 20, s_data: EMPLOYEE_COMUTING_ONE }, { s_id: 21, s_data: EMPLOYEE_COMUTING_TWO }],
    [{ s_id: 22, s_data: UPSTREAM_LEASED }],
    [{ s_id: 15, s_data: DOWNSTREAM_TRANSPORT_ONE, s_name: 'Road Transport -- Transportation Method - 1 (if fuel data is available)' }, { s_id: 16, s_data: DOWNSTREAM_TRANSPORT_TWO, s_name: 'Road Transport -- Transportation Method - 2 (if distance travelled data is available)' }, { s_id: 17, s_data: DOWNSTREAM_TRANSPORT_THREE, s_name: 'Other means of transportation' }],
    [{ s_id: 23, s_data: PROCESS_OF_SOLID }],
    [{ s_id: 24, s_data: USE_OF_SOLD_PRODUCTS }],
    [{ s_id: 25, s_data: END_OF_LIFE_TREATMENT }],
    [{ s_id: 26, s_data: DOWNSTREAM_LEASED_ASSETS }],
    [{ s_id: 27, s_data: FRANCHISES }],
    [{ s_id: 28, s_data: INVESTMENTS }],
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

ScopeThirdIndex.propTypes = {
  activeScope: PropTypes.string.isRequired,
};

export default ScopeThirdIndex;
