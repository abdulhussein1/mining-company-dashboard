import React, { useState } from 'react';
import {
  Container, Collapse, Button, CardBody, Card, Col, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Arrow } from '../../Components/common';
import { userUrl } from '../../Utils/Config';
import { changePassword } from '../Register/redux/action';
import { sendNotification, getUserId } from '../../Utils/globalFunctions';

const PasswordSecurity = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const Setup = (e) => {
    e.preventDefault();
    history.push(`${userUrl}/authentication-password`);
  };
  const userId = getUserId();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>

      <Col className="LoginPage d-flex pt-5 pb-5 h-auto">
        <Container>
          <Col sm="12" md={{ size: 6, offset: 3 }} className="shadow bg-white rounded overflow-hidden">
            <Col className="faq-main-title">Password &amp; Security</Col>

            <Col className="faq-inside p-4">
              <Formik
                initialValues={{ password: '', confirmPassword: '', current_password: '' }}
                validate={(values) => {
                  const errors = {};

                  if (!values.current_password) {
                    errors.current_password = 'Old Password is Required';
                  } else if (values.current_password.length <= 6) {
                    errors.current_password = 'Old Password must be more than 6 characters';
                  }

                  if (!values.password) {
                    errors.password = 'Password is Required';
                  } else if (values.password.length <= 6) {
                    errors.password = 'Password must be more than 6 characters';
                  }
                  if (!values.confirmPassword) {
                    errors.confirmPassword = 'Confirm Password is Required';
                  }
                  if (values.confirmPassword !== values.password) {
                    errors.confirmPassword = 'Both password need to be the same';
                  }
                  if (values.current_password === values.password && values.confirmPassword) {
                    errors.password = 'Old password not acceptable';
                    errors.confirmPassword = 'Old password not acceptable';
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  const allValues = (({ confirmPassword, ...o }) => o)(values);
                  await dispatch(changePassword({
                    data: {
                      ...allValues,
                    },
                    userId,
                  }))
                    .then((data) => {
                      if (data) {
                        sendNotification('success', 'Password Update Successfully', 1000, 'center-top');
                      }
                    });
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>

                    <Col className="plan-single-block">
                      <Button className="change-password-cta" onClick={toggle}>
                        <h5 className="mb-0 special_font">Change Password</h5>
                        <span className={isOpen ? 'rotate_arrow' : ''}><Arrow /></span>
                      </Button>
                      <Collapse isOpen={isOpen}>
                        <Card className="border-0">
                          <CardBody>

                            <Col className="p-2">
                              <FormGroup>
                                <Label for="Oldpassword" className="d-flex">Old Password</Label>
                                <Input
                                  type="password"
                                  name="current_password"
                                  id="Oldpassword"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.current_password}
                                />
                                <p className="text-danger m-0 d-flex">{errors.current_password && touched.current_password && errors.current_password}</p>
                              </FormGroup>
                              <FormGroup className="mt-4">
                                <Label for="Password" className="d-flex">New Password</Label>
                                <Input
                                  type="password"
                                  name="password"
                                  id="Password"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.password}
                                />
                                <p className="text-danger m-0 d-flex">{errors.password && touched.password && errors.password}</p>
                              </FormGroup>
                              <FormGroup className="mt-4">
                                <Label for="confirmpass" className="d-flex">Confirm Password</Label>
                                <Input
                                  type="password"
                                  name="confirmPassword"
                                  id="confirmpass"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.confirmPassword}
                                />
                                <p className="text-danger m-0 d-flex">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>
                              </FormGroup>
                            </Col>

                          </CardBody>
                        </Card>
                      </Collapse>
                    </Col>

                    <Col className="plan-single-block two-authentication p-4 mt-4">
                      <h5 className="mb-0 special_font">Two - step verification</h5>
                      <p className="mb-0">Enable</p>
                      <Button type="button" className="setup_cta" onClick={Setup}>Set up</Button>
                    </Col>

                    <Col className="right_side_button d-flex justify-content-end pt-4">
                      <Button type="submit" className="w-100 custom_cta upgrade-subscription" disabled={isSubmitting}>Save</Button>
                    </Col>

                  </Form>
                )}
              </Formik>

            </Col>

          </Col>
        </Container>
      </Col>

    </>
  );
};

export default PasswordSecurity;
