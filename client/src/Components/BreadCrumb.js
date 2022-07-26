/* eslint-disable react/prop-types */
import React from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const BreadCrumb = ({ breadCrumb }) => (
  <Col sm="7" className="d-flex align-items-center breadcrumb-list">
    {breadCrumb.map((item) => (
      <Link key={item.name} className={item.active ? 'active' : ''} to={item.link !== '' ? item.link : 'blank-page'}>{item.name}</Link>
    ))}
  </Col>
);

export default BreadCrumb;
