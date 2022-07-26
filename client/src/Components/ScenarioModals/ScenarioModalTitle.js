import React from 'react';
import {
  ModalHeader, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';

const ScenarioModalTitle = ({ title, close }) => {
  const closeBtn = <Button className="close" onClick={close}>&times;</Button>;
  return (
    <>
      <ModalHeader className="project_create_title" close={closeBtn}>{title}</ModalHeader>
    </>
  );
};

ScenarioModalTitle.propTypes = {
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default ScenarioModalTitle;
