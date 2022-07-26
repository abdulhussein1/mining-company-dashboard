/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, TabContent, TabPane, Nav, NavItem, NavLink, Button,
} from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { getProjectPhaseNames, getProjectPhaseYear } from '../redux/action';
import { getPhasesNameWIthId, getYearDifferenceNew } from '../../../Utils/globalFunctions';
import TableData from './TableData';

const TabsData = ({
  tab, type, activeScope, StatCombConst,
}) => {
  const dispatch = useDispatch();
  const [phaseIdValue, setPhaseIdValue] = useState();
  const [activeYearValue, setActiveYearValue] = useState();
  const [fullYears, setFullYears] = useState([]);
  // project phases name
  const {
    projectDetailData,
  } = useSelector((state) => state.dashboardReducer);

  const {
    projectPhaseNames,
    projectPhaseYear,
  } = useSelector((state) => state.energyAndClimateReducer);

  const projectId = projectDetailData.id;

  useEffect(() => {
    const initialLoad = () => {
      dispatch(getProjectPhaseNames(projectId));
    };
    initialLoad();
  }, [dispatch, projectId, tab, activeScope]);

  // project phases tabs click and show years
  const [activeTab, setActiveTab] = useState('');
  const toggle = (link, phaseId) => {
    setPhaseIdValue(phaseId);
    setActiveTab(link);
    if (projectPhaseNames.length > 0) {
      dispatch(getProjectPhaseYear(projectId, phaseId));
    }
  };

  useEffect(() => {
    if (projectPhaseNames.length > 0) {
      setActiveTab(projectPhaseNames[0]?.link);
      const phaseId = projectPhaseNames[0]?.id?.phase_id;
      setPhaseIdValue(phaseId);
      dispatch(getProjectPhaseYear(projectId, phaseId));
    }
  }, [projectPhaseNames, dispatch, projectId]);

  useEffect(() => {
    const years = getYearDifferenceNew(
      {
        d1: projectPhaseYear?.attributes?.start_date,
        d2: projectPhaseYear?.attributes?.end_date,
      },
    );
    setFullYears(years);
    setActiveYearValue(_.first(years));
  }, [projectPhaseYear]);

  // years click function
  const handleCSS = (e, year) => {
    setActiveYearValue(year);
    e.preventDefault();
  };

  const renderCombustion = () => (
    <>
      {StatCombConst.map((iidas) => (
        <TableData
          segmentName={iidas.s_name}
          onlyViewMode={iidas.only_view}
          segmentHeadings={iidas.s_heading}
          phaseIdValue={phaseIdValue}
          activeYearValue={activeYearValue}
          StatCombConst={iidas.s_data}
          segmentid={iidas.s_id}
          activeScope={activeScope}
        />
      ))}
    </>
  );

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
      {activeYearValue && phaseIdValue ? renderCombustion(type) : ''}

    </>
  );
};

TabsData.propTypes = {
  tab: PropTypes.string.isRequired,
  activeScope: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  StatCombConst: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default TabsData;
