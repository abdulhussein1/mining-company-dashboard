import React from 'react';
import {
  Row, Col, Card,
} from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../Components/BreadCrumb';
import { portalUrl, projectUrl, scenarioUrl } from '../../Utils/Config';
import WATER_MANAGEMENT from './Constants/WaterManagementConstant';
import DownloadReportButton from '../../Components/ReportModals/DownloadReportButton';
import DashboardCta from '../../Components/Dashboard/DashboardCta';
import CalculateAllMaterials from './CalculateAllMaterials';

const WaterManagement = () => {
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
      active: true,
      link: 'water-management',
      name: 'Water management',
    },
  ];

  return (
    <>
      <Row className="pt-2 pb-2">
        <BreadCrumb breadCrumb={breadCrumb} />
        <Col className="d-flex align-items-center justify-content-end report_and_download">
          <CalculateAllMaterials />
          <DownloadReportButton />
          <DashboardCta />
        </Col>
      </Row>

      <Col sm="12">
        <Card>
          <Col sm={{ size: 2, offset: 5 }} className="text-center pb-5 pt-4">
            <Link className="mt-4 climate-button" color="secondary" to="water-management">{WATER_MANAGEMENT[0].attributes.description}</Link>
            <Link
              className="mt-4 climate-button"
              color="secondary"
              to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/water-management/water-inventory`}
            >
              {WATER_MANAGEMENT[1].attributes.description}
            </Link>
            <Link className="mt-4 climate-button" color="secondary" to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/water-management/water-risk-assessment`}>{WATER_MANAGEMENT[2].attributes.description}</Link>
          </Col>
        </Card>
      </Col>

    </>
  );
};

export default WaterManagement;
