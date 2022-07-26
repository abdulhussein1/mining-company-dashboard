/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col, Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { getPhasesNameWIthId, getYearDifferenceNew } from '../../../Utils/globalFunctions';

const ScopeTabs = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const [fullYears, setFullYears] = useState([]);
  const [activeYearValue, setActiveYearValue] = useState();

  const handleCSS = (e, year) => {
    setActiveYearValue(year);
    e.preventDefault();
  };

  const {
    projectPhaseNames,
    projectPhaseYear,
  } = useSelector((state) => state.energyAndClimateReducer);

  useEffect(() => {
    const years = getYearDifferenceNew(
      {
        d1: projectPhaseYear?.attributes?.start_date,
        d2: projectPhaseYear?.attributes?.end_date,
      },
    );
    setFullYears(years);
  }, [projectPhaseYear]);
  return (
    <>
      <div className="row team_list_parent">
        <Col sm="12" className="manage_team_list tabs_headlines">
          <Nav tabs>
            {projectPhaseNames.map((item) => (
              <NavItem
                key={item.link}
                onClick={() => { toggle(item.link, item.id.phase_id, item); }}
              >
                <NavLink className={classnames({ active: activeTab === item.link })}>
                  {getPhasesNameWIthId({ id: item.id.phase_id })}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Col>
      </div>

      <TabContent activeTab={activeTab} className="manage-team-tabs">
        {projectPhaseNames.map((item) => (
          <TabPane tabId={item.link} key={item.link}>
            <Col sm="12" className="years_list pt-3">
              {fullYears.length > 0 && fullYears.map((items, key) => (
                <Button key={items} id={key} onClick={(e) => handleCSS(e, items)} className={items === activeYearValue ? 'me-2 px-3 mb-3 active_year' : 'me-2 px-3 mb-3 '}>{items}</Button>
              ))}
            </Col>
          </TabPane>
        ))}
      </TabContent>
    </>
  );
};

export default ScopeTabs;
