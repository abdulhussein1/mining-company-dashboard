import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button } from 'reactstrap';
import { ghgCalculateData } from '../Container/EnergyClimateChange/redux/action';
import { waterCalculateData } from '../Container/Water-Management/redux/action';

const GlobalCalculateData = () => {
  const dispatch = useDispatch();
  const { scenarioId } = useParams();
  const {
    projectDetailData,
  } = useSelector((state) => state.dashboardReducer);
  const projectId = projectDetailData.id;

  const setCalculateData = () => {
    const GhgCalcValues = {
      project_id: projectId, scenario_id: parseInt(scenarioId, 10), material_issue_id: 2,
    };
    dispatch(ghgCalculateData(GhgCalcValues));

    const WaterCalcValues = {
      project_id: projectId, scenario_id: parseInt(scenarioId, 10), material_issue_id: 6,
    };
    dispatch(waterCalculateData(WaterCalcValues));
  };
  return (
    <>
      <Button className="custom_cta px-3 transparent-cta btn btn-secondary me-2" onClick={setCalculateData}>Calculate</Button>
    </>
  );
};

export default GlobalCalculateData;
