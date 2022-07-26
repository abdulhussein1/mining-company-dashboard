/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';

import { Formik } from 'formik';
import { Logo, LoadingCheck, LoadingIconImage } from '../../Components/common';
import {
  getCountries, getIndustries, registerUser, userEmailCheck,
} from './redux/action';
import { sendNotification } from '../../Utils/globalFunctions';
// import { URL } from '../../Utils/Config';

const Register = () => {
  const formikRef = useRef();
  const initial = {
    first_name: '',
    last_name: '',
    full_name: null,
    address: 'demo',
    reporting_to_user_id: null,
    company_name: '',
    email_id: '',
    phone_number: '',
    job_title: '',
    business_sector_id: 0,
    website: '',
    geo_country_id: 0,
    password: '',
    confirmPassword: '',
    // user_verification_link: `${URL}/email-verification`,
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    countries,
    industries,
    // registerStatus,
    userEmailVerification,
  } = useSelector((state) => state.registerReducer);

  useEffect(() => {
    const initialLoad = () => {
      dispatch(getCountries());
      dispatch(getIndustries());
    };

    initialLoad();
  }, [dispatch]);

  return (
    <Col className="LoginPage h-auto pb-5">
      <Container className="themed-container container-custom-width" fluid="sm">
        <Col className="shadow p-4 bg-white rounded mt-5">
          <Col className="mb-2">
            <Logo />
          </Col>
          <Col className="w-100 text-center mb-4">
            Sign up for free.&nbsp;
            <span className="opacity-75">No credit card required</span>
          </Col>

          <Formik
            innerRef={formikRef}
            initialValues={initial}
            validate={(values) => {
              const errors = {};
              dispatch(userEmailCheck({ email: values.email_id }));
              if (!values.first_name) errors.first_name = 'First Name is Required';
              if (!values.last_name) errors.last_name = 'Last Name is Required';
              if (!values.company_name) errors.company_name = 'Company Name is Required';

              if (!values.email_id) {
                errors.email_id = 'Email is Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_id)) { errors.email_id = 'Invalid email address'; } else if (userEmailVerification.status === true) errors.email_id = 'Email address already exists';

              if (!values.phone_number) errors.phone_number = 'Phone Number is Required';
              else if (!/[+-]?\d+(?:[.,]\d+)?$/i.test(values.phone_number)) { errors.phone_number = 'Invalid Phone Number'; }

              if (!values.job_title) errors.job_title = 'Job Title is Required';
              if (!values.business_sector_id) errors.business_sector_id = 'Sector is Required';
              if (!values.geo_country_id) errors.geo_country_id = 'Country is Required';
              if (!values.password) {
                errors.password = 'Password is Required';
              } else if (values.password.length <= 8) {
                errors.password = 'Password must be more than 8 characters';
              }
              if (!/^(?=.*[A-Z])/.test(values.password)) {
                errors.uppercase = 'Password must have Upper Case Character';
              }
              if (!/^(?=.*[a-z])/.test(values.password)) {
                errors.lowercase = 'Password must contain a Lower Case Character ';
              }
              if (!/^(?=.*[0-9])/.test(values.password)) {
                errors.numeric = 'Password must contain a Numeric value';
              }
              if (!/^(?=.*[!@#\$%\^&\*])/.test(values.password)) {
                errors.special_char = 'Password must contain Special character';
              }
              if (values.password.includes(values.first_name)) {
                errors.name_in_password = 'Password can not contain Names';
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = 'Password is Required';
              }
              if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Both password need to be the same';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              const allValues = (({ confirmPassword, ...o }) => o)(values);
              dispatch(
                registerUser({
                  ...allValues,
                  business_sector_id: parseInt(allValues.business_sector_id, 10),
                  geo_country_id: parseInt(allValues.geo_country_id, 10),
                  full_name: `${allValues.first_name} ${allValues.last_name}`,
                }),
              ).then((data) => {
                if (data) {
                  sendNotification('success', 'Please check your email for verificaiton email');
                  formikRef.current?.resetForm();
                  history.push('/email-verification');
                }
                setSubmitting(false);
              });
            }}
          >
            {({
              values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="firstName">First Name</Label>
                      <Input
                        type="text"
                        name="first_name"
                        id="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                      />
                      <p className="text-danger m-0">{errors.first_name && touched.first_name && errors.first_name}</p>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="lastName">Last Name</Label>
                      <Input
                        type="text"
                        name="last_name"
                        id="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_name}
                      />
                      <p className="text-danger m-0">{errors.last_name && touched.last_name && errors.last_name}</p>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup className="mt-4">
                  <Label for="CompName">Company Name</Label>
                  <Input
                    type="text"
                    name="company_name"
                    id="CompName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.company_name}
                  />
                  <p className="text-danger m-0">
                    {errors.company_name && touched.company_name && errors.company_name}
                  </p>
                </FormGroup>
                <FormGroup className="mt-4 position-relative loading">
                  <Label for="WorkEmail">Email</Label>
                  <Input
                    type="email"
                    name="email_id"
                    id="WorkEmail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email_id}
                  />
                  {!errors.email_id
                  && touched.email_id
                  && userEmailVerification.loading === false
                  && userEmailVerification.status === false ? (
                    <div className="loading_image verify">
                      <LoadingCheck />
                    </div>
                    ) : (
                      ''
                    )}
                  {touched.email_id && userEmailVerification.loading ? (
                    <div className="loading_image">
                      <LoadingIconImage />
                    </div>
                  ) : (
                    ''
                  )}
                  <p className="text-danger m-0">{errors.email_id && touched.email_id && errors.email_id}</p>
                </FormGroup>
                <FormGroup className="mt-4">
                  <Label for="Website">Website</Label>
                  <Input
                    type="text"
                    name="website"
                    id="Website"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.website}
                  />
                </FormGroup>
                <Row>
                  <Col sm="6">
                    <FormGroup className="mt-4">
                      <Label for="PhoneNumber">Phone Number</Label>
                      <Input
                        type="text"
                        name="phone_number"
                        id="PhoneNumber"
                        pattern="[+-]?\d+(?:[.,]\d+)?"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone_number}
                      />
                      <p className="text-danger m-0">
                        {errors.phone_number && touched.phone_number && errors.phone_number}
                      </p>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup className="mt-4">
                      <Label for="JobTitle">Job Title</Label>
                      <Input
                        type="text"
                        name="job_title"
                        id="JobTitle"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.job_title}
                      />
                      <p className="text-danger m-0">{errors.job_title && touched.job_title && errors.job_title}</p>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup className="mt-4">
                      <Label for="Sector">Type of Sector</Label>
                      <Input
                        type="select"
                        name="business_sector_id"
                        id="Sector"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.business_sector_id}
                      >
                        <option value="0" disabled="disabled" defaultValue>
                          Select Sector
                        </option>
                        {industries.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.attributes.id_name}
                          </option>
                        ))}
                      </Input>
                      <p className="text-danger m-0">
                        {errors.business_sector_id && touched.business_sector_id && errors.business_sector_id}
                      </p>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup className="mt-4">
                      <Label for="Country">Country</Label>
                      <Input
                        type="select"
                        name="geo_country_id"
                        id="Country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.geo_country_id}
                      >
                        <option value="0" disabled="disabled" defaultValue>
                          Select Country
                        </option>
                        {countries.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.attributes.id_name}
                          </option>
                        ))}
                      </Input>
                      <p className="text-danger m-0">
                        {errors.geo_country_id && touched.geo_country_id && errors.geo_country_id}
                      </p>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup className="mt-4">
                  <Label for="Password">New Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <p className="text-danger m-0">{errors.password && touched.password && errors.password}</p>
                  {errors.uppercase && touched.password && (
                  <p className="text-danger m-0">* At Least contain one Upper Case Character</p>
                  )}
                  {errors.lowercase && touched.password && (
                  <p className="text-danger m-0">* At Least contain one Lower Case Character</p>
                  )}
                  {errors.special_char && touched.password && (
                  <p className="text-danger m-0">* At Least contain one Spacial Character</p>
                  )}
                  {errors.numeric && touched.password && (
                  <p className="text-danger m-0">* At Least contain one Numeric values</p>
                  )}
                  {errors.password && touched.password && <p className="text-danger m-0">* Length Must Be Minimum 8</p>}
                  {errors.name_in_password && errors.password && touched.password && (
                  <p className="text-danger m-0">* Password must not contain Names</p>
                  )}
                </FormGroup>
                <FormGroup className="mt-4">
                  <Label for="confirmpass">Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmpass"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  <p className="text-danger m-0">
                    {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                  </p>
                </FormGroup>
                <FormGroup className="mt-4 text-center">
                  By clicking &#34;sign up&#34; I agree to
                  <Link to="/register" className="custom-anchor">
                    {' '}
                    terms &amp; conditions
                    {' '}
                  </Link>
                </FormGroup>
                <Button type="submit" className="w-100 custom_cta mt-3" disabled={isSubmitting}>
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>

          <Row className="mt-3">
            <Col sm="12 d-flex justify-content-end">
              Already have an account? &nbsp;
              <Link to="/" className="custom-anchor">
                {' '}
                Log in
              </Link>
            </Col>
          </Row>
        </Col>
      </Container>
    </Col>
  );
};

export default Register;
