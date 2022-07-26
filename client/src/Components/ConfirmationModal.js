import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';

const ConfirmationModal = ({
  handleYesClick, content, title, isOpen, toggle,
}) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle} className="project_create_title">{title}</ModalHeader>
    <ModalBody>
      <Col className="confirmation_title">
        {content}
      </Col>
      <Col className="d-flex justify-content-center mt-3 mb-2">
        <Button color="primary me-2 custom_cta px-4" onClick={handleYesClick}>Yes</Button>
        <Button color="secondary custom_cta px-4 transparent-cta" onClick={toggle}>No</Button>
      </Col>
    </ModalBody>
  </Modal>
);
ConfirmationModal.propTypes = {
  handleYesClick: PropTypes.func.isRequired,
  isOpen: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ConfirmationModal;
