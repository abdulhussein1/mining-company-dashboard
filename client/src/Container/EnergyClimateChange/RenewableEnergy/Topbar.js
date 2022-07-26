import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../../Components/BreadCrumb';
import ScopeTabs from './AllScopes';
import { portalUrl, projectUrl, scenarioUrl } from '../../../Utils/Config';
import DownloadReportButton from '../../../Components/ReportModals/DownloadReportButton';
import '../../../App.css';
import CalculateData from './Calculate';
import DashboardCta from '../../../Components/Dashboard/DashboardCta';

const GHGTopbar = () => {
  const { scenarioId, scenarioName } = useParams();
  const {
    projectDetailData,
  } = useSelector((state) => state.dashboardReducer);
  const projectId = projectDetailData.id;

  const breadCrumb = [
    {
      active: false,
      link: `${portalUrl}/dashboard`,
      name: 'Home',
    },
    {
      active: false,
      link: '',
      name: `${projectDetailData.attributes.name}`,
    },
    {
      active: false,
      link: `${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}`,
      name: `${scenarioName}`,
    },
    {
      active: false,
      link: '',
      name: 'Environment',
    },
    {
      active: false,
      link: `${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/energy-climate`,
      name: 'Energy & Climate Change',
    },
    {
      active: true,
      link: 'renewable-energy',
      name: 'Renewable Energy',
    },
  ];
  return (
    <>
      <Row className="pt-2 pb-2">
        <BreadCrumb breadCrumb={breadCrumb} />
        <Col className="d-flex align-items-center justify-content-end report_and_download">
          <CalculateData />
          <DownloadReportButton />
          <DashboardCta />
        </Col>
      </Row>

      <ScopeTabs />
    </>
  );
};

export default GHGTopbar;
