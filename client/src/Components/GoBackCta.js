import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

const GoBackCta = () => {
  const history = useHistory();
  const handleClick = () => history.goBack();
  return (
    <>
      <Button className="custom_cta px-3 transparent-cta btn btn-secondary ms-2" onClick={handleClick}>Go Back To Data</Button>
    </>
  );
};

export default GoBackCta;
