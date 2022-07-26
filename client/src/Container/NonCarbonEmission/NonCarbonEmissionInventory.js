import React from 'react';
import {
  Col, Row, Button,
} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../Components/BreadCrumb';
import { portalUrl, projectUrl, scenarioUrl } from '../../Utils/Config';
import DownloadReportButton from '../../Components/ReportModals/DownloadReportButton';
import NonCarbonEmissionTabs from './NonCarbonEmissionTabs';

const NonCarbonEmissionInventory = () => {
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
      link: `${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/non-carbon-emission`,
      name: 'Non Carbon Emission',
    },
    {
      active: true,
      link: 'non-carbon-emission-inventory',
      name: 'Non Carbon Emissions Inventory',
    },
  ];

  return (
    <>
      <Row className="pt-2 pb-2">
        <BreadCrumb breadCrumb={breadCrumb} />
        <Col sm="5" className="d-flex align-items-center justify-content-end">
          <DownloadReportButton />
          <Link to={`${portalUrl}/${projectUrl}/${projectId}/sustainability-reporting`}><Button className="custom_cta ms-2 text-uppercase px-4">Dashboard</Button></Link>
        </Col>
      </Row>

      <NonCarbonEmissionTabs />
    </>
  );
};

export default NonCarbonEmissionInventory;
