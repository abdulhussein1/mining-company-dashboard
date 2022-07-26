import React from 'react';
import {
  Container, Col, Button,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { LoadingCheck } from './common';

const Logout = () => {
  const history = useHistory();
  const goToLogin = () => {
    history.push('/');
  };

  return (
    <>
      <Col className="LoginPage d-flex align-items-center">
        <Container className="themed-container container-custom-width" fluid="sm">
          <Col className="shadow p-5 bg-white rounded">
            <Col className="mb-3 logout_check_icon"><LoadingCheck /></Col>
            <Col className="text-center logout_heading special_font">Logout Successful</Col>
            <Col className="text-center logout_subheading">For re-login click to the below button</Col>
            <Col className="d-flex justify-content-center"><Button type="submit" className="px-4 custom_cta mt-4" onClick={goToLogin}>Login Again</Button></Col>
          </Col>
        </Container>
      </Col>
    </>
  );
};

export default Logout;
