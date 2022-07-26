/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import {
  Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu,
  Button,
  UncontrolledTooltip,
} from 'reactstrap';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import {
  ProjectName, ProjectOverview, ProjectDetails, BaseCase, ScenarioIcon,
  Stackholder, Ethics, SupplyChain, Corporate,
  Circular, Energy, Land, NonCarbon, Waste, Water, Occupational, Community, Education, Policies,
  EditScenario,
  Labor,
  HumanRight,
} from './common';
import ScenarioModal from './ScenarioModals/Scenario';
import { portalUrl, projectUrl, scenarioUrl } from '../Utils/Config';
import { getPhasesDuration, getProjectDetail, getScenarioList } from '../Container/Dashboard/redux/action';
import {
  getMetaMaterialIssueEconomics,
  getMetaMaterialIssueCategory, getMetaMaterialIssueEnvironment,
  getMetaMaterialIssueGovernance,
  getMetaMaterialIssueSocial,
  saveFilterValues,
  setDashboardBlankData,
  getMaterialIssueChild,
} from './redux/action';
import ENERGY_CLIMATE_CHANGE from '../Container/EnergyClimateChange/Constants/EnergyClimateConstant';
import UpdateScenarioModal from './ScenarioModals/UpdateScenario';
import ENVIRONMENT from './Constants/EnvironmentConstent';
import GOVERNANCE from './Constants/GovernanceConstent';
import SOCIAL from './Constants/SocialConstent';
import WATER_MANAGEMENT from '../Container/Water-Management/Constants/WaterManagementConstant';
// import { getSidebarEnergyIcon } from '../Utils/globalFunctions';

const Sidebar = () => {
  const hideSidebar = window.location.pathname.match('dashboard') ? 'd-none' : '';
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectId } = useParams();
  const [projectCASen, setProjectCASen] = useState([]);
  const [clickedItem, setClickedItem] = useState(0);

  const [defaultState, setdefaultState] = useState({
    eneryClimate: false,
    scenarioModel: false,
    waterManagement: false,
    wasteManagement: false,
    nonCarbonEmission: false,
    circularEconomy: false,
    updateScenarioModel: false,
  });

  const {
    projectDetailData,
    scenarioList,
  } = useSelector((state) => state.dashboardReducer);

  const {
    metaMaterialIssueCategory,
  } = useSelector((state) => state.componentReducer);

  const updateState = (key, value, scenario_id) => {
    setdefaultState({
      ...defaultState,
      [key]: value,
      scenario_id,
    });
  };

  const handleCSS = (items, i) => {
    setProjectCASen([items]);
    setClickedItem(i);
    history.push(`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${items.attributes.scenario_name}/${items.id.scenario_id}`);
  };

  useEffect(() => {
    if (scenarioList.length > 0) {
      setProjectCASen([scenarioList[0]]);
    }
  }, [scenarioList]);

  useEffect(() => {
    const initialLoad = () => {
      dispatch(getScenarioList(projectId));
      dispatch(getMetaMaterialIssueCategory());
      dispatch(getMetaMaterialIssueEconomics());
      dispatch(getMetaMaterialIssueEnvironment());
      dispatch(getMetaMaterialIssueGovernance());
      dispatch(getMetaMaterialIssueSocial());
      dispatch(getProjectDetail(projectId));
      dispatch(getPhasesDuration(projectId));
    };

    initialLoad();
  }, [dispatch, projectId]);

  // dashboard page data rest API's
  useEffect(() => {
    dispatch(saveFilterValues());
    dispatch(setDashboardBlankData());
    dispatch(getMaterialIssueChild());
    const ele = document.getElementsByName('materialIssuesChild');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ele.length; i++) { ele[i].checked = false; }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {defaultState.scenarioModel
        ? <ScenarioModal open={defaultState.scenarioModel} close={() => updateState('scenarioModel', false)} /> : null}

      {defaultState.updateScenarioModel
        ? <UpdateScenarioModal scenario_id={defaultState.scenario_id} open={defaultState.updateScenarioModel} close={() => updateState('updateScenarioModel', false)} /> : null}

      <div className={`${hideSidebar} sidebar`}>
        <Nav vertical>
          <NavItem id="projName">
            <NavLink to={`${portalUrl}/${projectUrl}/${projectId}`}>
              <span><ProjectName /></span>
              <p id="projName">{projectDetailData?.attributes?.name}</p>
              <UncontrolledTooltip placement="top" target="projName">
                {projectDetailData?.attributes?.name}
              </UncontrolledTooltip>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`${portalUrl}/${projectUrl}/${projectId}`}>
              <span><ProjectOverview /></span>
              Project Overview
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/detail`}>
              <span><ProjectDetails /></span>
              Project Details
            </NavLink>
          </NavItem>
          <Dropdown nav className="scenario_flow">
            <DropdownToggle nav>
              Project Scenarios
            </DropdownToggle>
            <DropdownMenu>
              <Nav vertical>
                {scenarioList.map((items, i) => (
                  <div className={clickedItem === i ? 'active_nav' : ''} key={i}>
                    <NavItem onClick={() => { handleCSS(items, i); }}>
                      <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${items.attributes.scenario_name}/${items.id.scenario_id}`}>
                        <span><BaseCase /></span>
                        {items.attributes.scenario_name}
                      </NavLink>
                    </NavItem>
                    <Button className="edit_scenario" onClick={() => updateState('updateScenarioModel', true, items?.id?.scenario_id)}><EditScenario /></Button>
                  </div>
                ))}
                <NavItem>
                  <Button className="nav_btn" onClick={() => updateState('scenarioModel', true)}>
                    <span><ScenarioIcon /></span>
                    Create New Scenarios
                  </Button>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </Dropdown>

          <Dropdown nav>
            <DropdownToggle nav>
              <span />
              {metaMaterialIssueCategory[1]?.attributes?.description}
            </DropdownToggle>
            <DropdownMenu>
              <Nav vertical>
                {/* {metaMaterialIssue.map((item) => (
                  <NavItem>
                    <Link to={`${portalUrl}/${projectUrl}/${projectId}/${item.id}`}>
                      {getSidebarEnergyIcon({ id: item.id })}
                      {item.attributes.id_name}
                    </Link>
                  </NavItem>
                ))} */}
                <Dropdown nav>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/energy-climate`}>
                    <span><Energy /></span>
                    {ENVIRONMENT[0].attributes.id_name}
                  </NavLink>
                  <Button onClick={() => updateState('eneryClimate', !defaultState.eneryClimate)} className={`${defaultState.eneryClimate ? 'change-button' : ''}`}>{}</Button>
                  <DropdownMenu className={`${defaultState.eneryClimate ? 'active-dropdown' : ''}`}>
                    <Nav vertical>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/energy-climate/management-approach`}>
                          {ENERGY_CLIMATE_CHANGE[0].attributes.description}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/energy-climate/ghg-inventory`}>
                          {ENERGY_CLIMATE_CHANGE[1].attributes.description}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/energy-climate/renewable-energy`}>
                          {ENERGY_CLIMATE_CHANGE[2].attributes.description}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/energy-climate/sbti-targets`}>
                          {ENERGY_CLIMATE_CHANGE[3].attributes.description}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/energy-climate/carbon-offsets`}>
                          {ENERGY_CLIMATE_CHANGE[4].attributes.description}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/energy-climate/scenario-planning`}>
                          {ENERGY_CLIMATE_CHANGE[5].attributes.description}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/energy-climate/climate-change-risks`}>
                          {ENERGY_CLIMATE_CHANGE[6].attributes.description}
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </DropdownMenu>
                </Dropdown>

                <Dropdown nav>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/water-management`}>
                    <span><Water /></span>
                    {ENVIRONMENT[1].attributes.id_name}
                  </NavLink>
                  <Button onClick={() => updateState('waterManagement', !defaultState.waterManagement)} className={`${defaultState.waterManagement ? 'change-button' : ''}`}>{}</Button>
                  <DropdownMenu className={`${defaultState.waterManagement ? 'active-dropdown' : ''}`}>
                    <Nav vertical>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/water-management/water-management-approach`}>
                          Management Approach
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          exact
                          activeClassName="active-child"
                          to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/water-management/water-inventory?projectid=${projectId}&materialIssueId=${WATER_MANAGEMENT[1].references.material_issue_data_key.id.material_issue_id}&miChildLevel=water_inventory`}
                        >
                          {/* Water Inventory */}
                          {WATER_MANAGEMENT[1].attributes.description}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/water-management/water-risk-assessment?projectid=${projectId}&materialIssueId=${WATER_MANAGEMENT[2].references.material_issue_data_key.id.material_issue_id}&miChildLevel=water_risk_assessment`}>
                          {/* Water Operational Risk Assessment */}
                          {WATER_MANAGEMENT[2].attributes.description}
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </DropdownMenu>
                </Dropdown>

                <Dropdown nav>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/waste-tail-management`}>
                    <span><Waste /></span>
                    {ENVIRONMENT[2].attributes.id_name}
                  </NavLink>
                  <Button onClick={() => updateState('wasteManagement', !defaultState.wasteManagement)} className={`${defaultState.wasteManagement ? 'change-button' : ''}`}>{}</Button>
                  <DropdownMenu className={`${defaultState.wasteManagement ? 'active-dropdown' : ''}`}>
                    <Nav vertical>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/waste-tail-management/waste-management-approach`}>
                          Management Approach
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/waste-tail-management/waste-generation`}>
                          Waste Generation
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/waste-tail-management/waste-prevention`}>
                          Waste Prevention
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/waste-tail-management/practices-and-assurances`}>
                          Practices and Assurances
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </DropdownMenu>
                </Dropdown>

                <Dropdown nav>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/non-carbon-emission`}>
                    <span><NonCarbon /></span>
                    {ENVIRONMENT[3].attributes.id_name}
                  </NavLink>
                  <Button onClick={() => updateState('nonCarbonEmission', !defaultState.nonCarbonEmission)} className={`${defaultState.nonCarbonEmission ? 'change-button' : ''}`}>{}</Button>
                  <DropdownMenu className={`${defaultState.nonCarbonEmission ? 'active-dropdown' : ''}`}>
                    <Nav vertical>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/non-carbon-emission/non-carbon-management-approach`}>
                          Management Approach
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/non-carbon-emission/non-carbon-emission-inventory`}>
                          Non Carbon Emissions Inventory
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </DropdownMenu>
                </Dropdown>

                <Dropdown nav>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/circular-economy`}>
                    <span><Circular /></span>
                    {ENVIRONMENT[4].attributes.id_name}
                  </NavLink>
                  <Button onClick={() => updateState('circularEconomy', !defaultState.circularEconomy)} className={`${defaultState.circularEconomy ? 'change-button' : ''}`}>{}</Button>
                  <DropdownMenu className={`${defaultState.circularEconomy ? 'active-dropdown' : ''}`}>
                    <Nav vertical>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/circular-economy/circular-management-approach`}>
                          Management Approach
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/circular-economy/circular-transition`}>
                          Circular Transition
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink exact activeClassName="active-child" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/circular-economy/performance-evaluation`}>
                          Performance Evaluation
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </DropdownMenu>
                </Dropdown>

                <NavItem>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${projectCASen[0]?.attributes?.scenario_name}/${projectCASen[0]?.id?.scenario_id}/landuse-biodiversity`}>
                    <span><Land /></span>
                    {ENVIRONMENT[5].attributes.id_name}
                  </NavLink>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </Dropdown>

          <Dropdown nav>
            <DropdownToggle nav>
              <span />
              {metaMaterialIssueCategory[2]?.attributes?.description}
            </DropdownToggle>
            <DropdownMenu>
              <Nav vertical>
                <NavItem>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/strategy-policies`}>
                    <span><Policies /></span>
                    {GOVERNANCE[0].attributes.id_name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/corporate-governance`}>
                    <span><Corporate /></span>
                    {GOVERNANCE[1].attributes.id_name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/ethics-compliance`}>
                    <span><Ethics /></span>
                    {GOVERNANCE[2].attributes.id_name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/supply-chain-management`}>
                    <span><SupplyChain /></span>
                    {GOVERNANCE[3].attributes.id_name}
                  </NavLink>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </Dropdown>

          <Dropdown nav>
            <DropdownToggle nav>
              <span />
              {metaMaterialIssueCategory[3]?.attributes?.description}
            </DropdownToggle>
            <DropdownMenu>
              <Nav vertical>
                <NavItem>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/occupational-health-safety`}>
                    <span><Occupational /></span>
                    {SOCIAL[0].attributes.id_name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/labor-practices`}>
                    <span><Labor /></span>
                    {SOCIAL[1].attributes.id_name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/human-rights`}>
                    <span><HumanRight /></span>
                    {SOCIAL[2].attributes.id_name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/community-relations`}>
                    <span><Community /></span>
                    {SOCIAL[3].attributes.id_name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/stakholder-engagement`}>
                    <span><Stackholder /></span>
                    {SOCIAL[4].attributes.id_name}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={`${portalUrl}/${projectUrl}/${projectId}/training-education`}>
                    <span><Education /></span>
                    {SOCIAL[5].attributes.id_name}
                  </NavLink>
                </NavItem>
              </Nav>
            </DropdownMenu>
          </Dropdown>

          <Dropdown nav>
            <DropdownToggle nav>
              <span />
              {metaMaterialIssueCategory[0]?.attributes?.description}
            </DropdownToggle>
          </Dropdown>

        </Nav>
      </div>

    </>
  );
};

// Sidebar.propTypes = {
//   to: PropTypes.string,
// };
// Sidebar.defaultProps = {
//   to: null,
// };

export default Sidebar;
