import React, { useState } from 'react';
import {
  Container, Row, Col,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { PlusSign } from '../../Components/common';
import ProjectList from './Project-List';
import NewProject from './NewProject/index';
import { CREATE_PROJECT } from './redux/constant';

const Dashboard = () => {
  const [projectModel, setProjectModel] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch({ type: CREATE_PROJECT, payload: {} });
    setProjectModel(true);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm="3" className="shadow p-3 bg-white rounded mt-5 d-flex align-items-center new-project-create" onClick={openModal} aria-hidden="true">
            <div className="plus-sign me-4 d-flex align-items-center justify-content-center"><PlusSign /></div>
            <div className="mb-0"><h5 className="m-0 primary_font">Create new project</h5></div>
          </Col>
          {projectModel
            ? <NewProject open={projectModel} close={() => setProjectModel(false)} /> : null}
        </Row>
      </Container>

      <ProjectList />
    </>
  );
};

export default Dashboard;
