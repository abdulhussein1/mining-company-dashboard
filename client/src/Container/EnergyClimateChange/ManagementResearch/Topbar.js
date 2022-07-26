import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Row,
} from 'reactstrap';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../../Components/BreadCrumb';
import { portalUrl, projectUrl, scenarioUrl } from '../../../Utils/Config';
import ScopeTabs from './AllScopes';
import DownloadReportButton from '../../../Components/ReportModals/DownloadReportButton';
import '../../../App.css';

const GHGTopbar = () => {
  const history = useHistory();
  const { scenarioId, scenarioName } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  // add and remove class on body
  useEffect(() => {
    document.body.classList.toggle('show_dashboard', isOpen);
  }, [isOpen]);
  useEffect(() => history.listen(() => {
    document.body.classList.remove('show_dashboard');
  }), [history]);

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
      link: 'management-approach',
      name: 'Management Approach',
    },
  ];
  return (
    <>
      <Row className="pt-2 pb-2">
        <BreadCrumb breadCrumb={breadCrumb} />
        <Col className="d-flex align-items-center justify-content-end report_and_download">
          <Button id="calculate_btn">Calculate</Button>
          <DownloadReportButton />
          <Button className="custom_cta ms-2 text-uppercase px-4 dashboard_cta" onClick={() => setIsOpen(!isOpen)}>Dashboard</Button>
          <Button className="custom_cta px-3 transparent-cta ms-2 back_to_data" onClick={() => setIsOpen(!isOpen)}>
            <RiArrowGoBackFill className="me-2" />
            Back to data entry
          </Button>
        </Col>
      </Row>
      <Row />
      <ScopeTabs />
    </>
  );
};

export default GHGTopbar;
