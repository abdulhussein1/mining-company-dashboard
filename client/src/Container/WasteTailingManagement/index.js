/* eslint-disable jsx-quotes */
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../Components/BreadCrumb';
import { portalUrl, projectUrl, scenarioUrl } from '../../Utils/Config';

const WasteTailingManagement = () => {
  const { scenarioId, scenarioName } = useParams();
  const { projectDetailData } = useSelector((state) => state.dashboardReducer);
  const projectId = projectDetailData.id;

  const breadCrumb = [
    {
      active: false,
      link: `${portalUrl}dashboard`,
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
      link: 'waste-tail-management',
      name: 'Waste & Tailing Management',
    },
  ];

  const Items = [
    {
      id: 'climate1',
      link: `${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/waste-tail-management`,
      name: 'Management Approach',
    },
    {
      id: 'climate2',
      link: `${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/waste-tail-management/waste-generation`,
      name: 'Waste Generation',
    },
    {
      id: 'climate3',
      link: `${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/waste-tail-management`,
      name: 'Waste Prevention',
    },
    {
      id: 'climate4',
      link: `${portalUrl}/${projectUrl}/${projectId}/${scenarioUrl}/${scenarioName}/${scenarioId}/waste-tail-management`,
      name: 'Practices and Assurances',
    },
  ];

  return (
    <>
      <Row className='pt-3 pb-3'>
        <BreadCrumb breadCrumb={breadCrumb} />
      </Row>
      <Col sm='12'>
        <Card>
          <Col sm={{ size: 2, offset: 5 }} className='text-center pb-5 pt-4'>
            {Items.map((item) => (
              <Link
                className='mt-4 climate-button'
                color='secondary'
                key={item.id}
                to={item.link}
              >
                {item.name}
              </Link>
            ))}
          </Col>
        </Card>
      </Col>
    </>
  );
};

export default WasteTailingManagement;
