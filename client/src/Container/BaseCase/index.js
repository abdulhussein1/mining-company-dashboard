import React from 'react';
import {
  Card, CardTitle, CardText, Row, Col, Input, Button,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  HumanRight, Labor, Stackholder, Ethics, SupplyChain,
  Corporate, Energy, Water, Waste, NonCarbon, Circular, Land,
  Education, Community, Occupational, Policies,
} from '../../Components/common';
import BreadCrumb from '../../Components/BreadCrumb';
import { portalUrl, projectUrl, scenarioUrl } from '../../Utils/Config';
import ENVIRONMENT from '../../Components/Constants/EnvironmentConstent';
import DownloadReportButton from '../../Components/ReportModals/DownloadReportButton';
import GlobalCalculateData from '../../Components/GlobalCalculate';
import DashboardCta from '../../Components/Dashboard/DashboardCta';

const BaseCase = () => {
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
      active: true,
      link: `${scenarioId}`,
      name: `${scenarioName}`,
    },
  ];

  return (
    <>
      <Row className="pt-2 pb-2">
        <BreadCrumb breadCrumb={breadCrumb} />
        <Col className="d-flex align-items-center justify-content-end report_and_download">
          <GlobalCalculateData />
          <DownloadReportButton />
          <DashboardCta />
        </Col>
      </Row>

      <Col className="all_services mt-3">
        <Row>
          <Col sm="3" className="service-block">
            <Card className="shadow bg-white">
              <CardTitle className="text-center text-uppercase p-3 mb-0">Environment</CardTitle>
              <Col className="p-4 pb-0">
                <CardText className="mb-4">
                  <Link to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/energy-climate`} className="d-flex">
                    <span><Energy /></span>
                    {ENVIRONMENT[0].attributes.id_name}
                  </Link>
                </CardText>
                <CardText className="mb-4">
                  <Link to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/water-management`} className="d-flex">
                    <span><Water /></span>
                    {ENVIRONMENT[1].attributes.id_name}
                  </Link>
                </CardText>
                <CardText className="mb-4">
                  <Link to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/waste-tail-management`} className="d-flex">
                    <span><Waste /></span>
                    {ENVIRONMENT[2].attributes.id_name}
                  </Link>
                </CardText>
                <CardText className="mb-4">
                  <Link to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/non-carbon-emission`} className="d-flex">
                    <span><NonCarbon /></span>
                    {ENVIRONMENT[3].attributes.id_name}
                  </Link>
                </CardText>
                <CardText className="mb-4">
                  <Link to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/circular-economy`} className="d-flex">
                    <span><Circular /></span>
                    {ENVIRONMENT[4].attributes.id_name}
                  </Link>
                </CardText>
                <CardText className="mb-4">
                  <Link to={`${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/landuse-biodiversity`} className="d-flex">
                    <span><Land /></span>
                    {ENVIRONMENT[5].attributes.id_name}
                  </Link>
                </CardText>
              </Col>
            </Card>
          </Col>

          <Col sm="3" className="service-block">
            <Card className="shadow bg-white">
              <CardTitle className="text-center text-uppercase p-3 mb-0">social</CardTitle>
              <Col className="p-4 pb-0">
                <CardText className="mb-4">
                  <span><Occupational /></span>
                  Occupational Health &amp; Safety
                </CardText>
                <CardText className="mb-4">
                  <span><Labor /></span>
                  Labor Practices
                </CardText>
                <CardText className="mb-4">
                  <span><HumanRight /></span>
                  Human Rights
                </CardText>
                <CardText className="mb-4">
                  <span><Community /></span>
                  Community Relations
                </CardText>
                <CardText className="mb-4">
                  <span><Stackholder /></span>
                  Stakholder Engagement
                </CardText>
                <CardText className="mb-4">
                  <span><Education /></span>
                  Training &amp; Education
                </CardText>
              </Col>
            </Card>
          </Col>

          <Col sm="3" className="service-block">
            <Card className="shadow bg-white">
              <CardTitle className="text-center text-uppercase p-3 mb-0">Governance</CardTitle>
              <Col className="p-4 pb-0">
                <CardText className="mb-4">
                  <span><Policies /></span>
                  Strategy &amp; Policies
                </CardText>
                <CardText className="mb-4">
                  <span><Corporate /></span>
                  Corporate Governance
                </CardText>
                <CardText className="mb-4">
                  <span><Ethics /></span>
                  Ethics &amp; Compliance
                </CardText>
                <CardText className="mb-4">
                  <span><SupplyChain /></span>
                  Supply Chain Management
                </CardText>
              </Col>
            </Card>
          </Col>

          <Col sm="3" className="service-block">
            <Card className="shadow bg-white">
              <CardTitle className="text-center text-uppercase p-3 mb-0">economics</CardTitle>
              <Col className="p-4 pb-0" />
            </Card>
          </Col>
        </Row>
      </Col>

      <Col sm="12" className="mt-5 p-4">
        <h5 className="primary_font">Notes</h5>
        <Input type="textarea" name="text" />
        <Button type="submit" className="custom_cta mt-3 px-4">Add</Button>
      </Col>
    </>
  );
};

export default BaseCase;
