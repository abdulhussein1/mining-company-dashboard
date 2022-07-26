import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import { FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { portalUrl, projectUrl } from '../../Utils/Config';
import { deleteProjectData, getProjectLists } from './redux/action.js';
import { getUserId, sendNotification } from '../../Utils/globalFunctions';

const ProjectList = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [projectsId, setprojectsId] = useState(false);
  const toggle = () => setModal(!modal);

  const {
    getProjectListing,
  } = useSelector((state) => state.dashboardReducer);

  useEffect(() => {
    const initialLoad = () => {
      const tempId = getUserId();
      dispatch(getProjectLists(tempId));
    };
    initialLoad();
  }, [dispatch]);

  const deleteProject = (projectId) => {
    dispatch(deleteProjectData(projectId)).then((data) => {
      if (data) {
        const tempId = getUserId();
        dispatch(getProjectLists(tempId));
        sendNotification('success', 'Project Deleted SuccessFully', 1000, 'top-center');
      }
    });
  };

  return (
    <>
      <Col sm="12" className="mt-5 mb-4"><h4 className="special_font">List of projects</h4></Col>
      <Row>
        {getProjectListing ? (
          <>
            {getProjectListing.map((item) => (
              <Col sm="3 mb-4 project_list" key={item?.link}>
                <Col className="shadow p-3 bg-white rounded position-relative overflow-hidden proj_list_parent">
                  <h5 className="text-blue mb-4 primary_font">{item?.attributes?.name}</h5>
                  <Col className="text-center access_detail">
                    <p className="mb-1">
                      Accessed by:
                      <span className="text-blue">Brian</span>
                    </p>
                    <p className="mb-0">
                      Last edited at
                      <span>12/3/2021</span>
                    </p>
                  </Col>
                  <UncontrolledDropdown className="project_actions">
                    <DropdownToggle caret>
                      <FaEllipsisH />
                    </DropdownToggle>
                    <DropdownMenu>
                      <Link to={`${portalUrl}/${projectUrl}/${item?.id}`}>View</Link>
                      <Button onClick={() => { toggle(); setprojectsId(item?.id); }}>Delete</Button>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Col>
              </Col>
            ))}
          </>
        ) : null}
      </Row>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="project_create_title">Delete Project</ModalHeader>
        <ModalBody>
          <Col className="confirmation_title">
            Are you sure you want to delete this project ?
          </Col>
          <Col className="d-flex justify-content-center mt-3 mb-2">
            <Button color="primary me-2 custom_cta px-4" onClick={() => { deleteProject(projectsId); toggle(); }}>Yes</Button>
            <Button color="secondary custom_cta px-4 transparent-cta" onClick={toggle}>No</Button>
          </Col>
        </ModalBody>
      </Modal>
    </>
  );
};
export default ProjectList;
