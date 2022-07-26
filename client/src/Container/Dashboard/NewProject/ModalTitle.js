import React from 'react';
import {
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';

const ModalTitle = ({ title }) => (
  <>
    <ModalHeader className="project_create_title">{title}</ModalHeader>
  </>
);

ModalTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ModalTitle;
