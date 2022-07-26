import React from 'react';
import {
  Button, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';

const ScenarioCreateCopy = ({ next, create }) => (
  <>
    <Col className="p-3">
      <Button className="w-100 custom_cta pt-3 pb-3 h-auto mb-4 btn btn-secondary transparent-cta" onClick={create}>Create new scenario</Button>
      <Button className="w-100 custom_cta  pt-3 pb-3  h-auto btn btn-secondary" onClick={next}>Copy data from another scenario</Button>
    </Col>
  </>
);

ScenarioCreateCopy.propTypes = {
  next: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
};

export default ScenarioCreateCopy;
