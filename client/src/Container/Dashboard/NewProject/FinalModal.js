import React from 'react';
import {
  Button, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { PrevCta } from '../../../Components/common';

const Final = ({ submit, prev }) => (
  <>
    <Col sm={12}>
      <p>
        By default, a base case scenario is created. you can change
        this name by clicking base case entry created in left navigation.
      </p>
      <p>Using base case user can prepare sustainability using actual data at project level.</p>
      <p>
        There is an option create new scenarios on the left navigation under project
        scenarios, which can be compared with base case for decision making.
      </p>
    </Col>
    <Col className="text-center mt-4">
      <Button type="button" onClick={prev} className="arrow_prev"><PrevCta /></Button>
      <Button type="submit" onClick={submit} className="custom_cta px-4">Next</Button>
    </Col>
  </>
);

Final.propTypes = {
  submit: PropTypes.func,
  prev: PropTypes.func.isRequired,
};
Final.defaultProps = {
  submit: (() => {}),
};

export default Final;
