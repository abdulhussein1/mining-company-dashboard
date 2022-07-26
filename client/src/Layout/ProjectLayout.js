/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import BaseCase from '../Container/BaseCase';
import WasteTailingManagement from '../Container/WasteTailingManagement';
import EnergyClimateChange from '../Container/EnergyClimateChange/index';
import WaterManagement from '../Container/Water-Management';
import ProjectOverviewPage from '../Container/ProjectOverview';
import ProjectDetailPage from '../Container/ProjectDetail';
import WasteGeneration from '../Container/WasteTailingManagement/WasteGeneration';
import NonCarbonEmission from '../Container/NonCarbonEmission';
import NonCarbonEmissionInventory from '../Container/NonCarbonEmission/NonCarbonEmissionInventory';
import CircularEconomy from '../Container/CircularEconomy';
import CircularTransition from '../Container/CircularEconomy/CircularTransition';
import PerformanceEvalutation from '../Container/CircularEconomy/PerformanceEvaluation';
import { scenarioUrl } from '../Utils/Config';
import GHGTopbar from '../Container/EnergyClimateChange/GhgInventory/Topbar';
import MRTopbar from '../Container/EnergyClimateChange/ManagementResearch/Topbar';
import RETopbar from '../Container/EnergyClimateChange/RenewableEnergy/Topbar';
import SBTTopbar from '../Container/EnergyClimateChange/SBTTargets/Topbar';
import CarbonTopbar from '../Container/EnergyClimateChange/CarbonOffset/Topbar';
import ClimateChangeTopBar from '../Container/EnergyClimateChange/ClimateChangeRisk/Topbar';
import ScenarioTopBar from '../Container/EnergyClimateChange/ScenarioPlanning/Topbar';
import WaterInventoryTopbar from '../Container/Water-Management/WaterInventory/Topbar';
import WaterRiskTopbar from '../Container/Water-Management/WaterOperational/Topbar';
import DashboardPage from '../Components/Dashboard';

const ProjectLayout = ({ url }) => (
  <>
    <Sidebar />
    <Switch>
      <Route exact path={`${url}/`} component={ProjectOverviewPage} />
      <Route exact path={`${url}/detail`} component={ProjectDetailPage} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId`} component={BaseCase} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/dashboard`} component={DashboardPage} />

      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/energy-climate`} component={EnergyClimateChange} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/water-management`} component={WaterManagement} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/waste-tail-management`} component={WasteTailingManagement} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/non-carbon-emission`} component={NonCarbonEmission} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/circular-economy`} component={CircularEconomy} />

      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/energy-climate/ghg-inventory`} component={GHGTopbar} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/energy-climate/management-approach`} component={MRTopbar} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/energy-climate/renewable-energy`} component={RETopbar} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/energy-climate/sbti-targets`} component={SBTTopbar} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/energy-climate/carbon-offsets`} component={CarbonTopbar} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/energy-climate/climate-change-risks`} component={ClimateChangeTopBar} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/energy-climate/scenario-planning`} component={ScenarioTopBar} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/water-management/water-inventory`} component={WaterInventoryTopbar} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/water-management/water-risk-assessment`} component={WaterRiskTopbar} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/waste-tail-management/waste-generation`} component={WasteGeneration} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/non-carbon-emission/non-carbon-emission-inventory`} component={NonCarbonEmissionInventory} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/circular-economy/circular-transition`} component={CircularTransition} />
      <Route exact path={`${url}/${scenarioUrl}/:scenarioName/:scenarioId/circular-economy/performance-evaluation`} component={PerformanceEvalutation} />
    </Switch>
  </>
);

export default ProjectLayout;
