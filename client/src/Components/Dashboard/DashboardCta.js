import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { portalUrl, projectUrl, scenarioUrl } from '../../Utils/Config';

const DashboardCta = () => {
  const { scenarioId, scenarioName } = useParams();
  const {
    projectDetailData,
  } = useSelector((state) => state.dashboardReducer);
  const projectId = projectDetailData.id;

  return (
    <>
      <Link to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/dashboard`} className="custom_cta px-3 btn btn-secondary ms-2">
        Dashboard
      </Link>
    </>
  );
};

export default DashboardCta;
