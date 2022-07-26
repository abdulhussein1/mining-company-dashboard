import React from 'react';
import {
  Button,
} from 'reactstrap';
import { RiArrowGoBackFill } from 'react-icons/ri';

const ReportBackButton = () => (
  <>
    <Button className="custom_cta px-3 transparent-cta ms-2">
      <RiArrowGoBackFill className="me-2" />
      Back to data entry
    </Button>
  </>
);

export default ReportBackButton;
