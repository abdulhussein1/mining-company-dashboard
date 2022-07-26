import React from 'react';
import { Container, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { portalUrl } from '../../Utils/Config';

const Tutorial = () => (
  <>
    <Col className="LoginPage d-flex align-items-center tutorial-section">
      <Container className="themed-container container-custom-width" fluid="sm">
        <Col className="shadow p-4 bg-white rounded position-relative">
          <iframe width="100%" height="500" src="https://www.youtube.com/embed/btmjDyff6E8" title="YouTube video player" />
          <Col className="text-center mt-3"><Link to={`${portalUrl}/dashboard`} className="btn btn-secondary custom_cta px-4">Next</Link></Col>
          <Col className="skip"><Link to={`${portalUrl}/dashboard`} className="custom-anchor">Skip</Link></Col>
        </Col>
      </Container>
    </Col>
  </>
);

export default Tutorial;
