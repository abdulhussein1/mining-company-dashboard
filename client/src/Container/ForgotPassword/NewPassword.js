import React from 'react';
import {
  Container, Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../../Components/common';
import { updateNewPassword } from '../Register/redux/action';
import { sendNotification } from '../../Utils/globalFunctions';

const NewPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.registerReducer.autoLoginToken);
  const forgotTokeSplit = token.split('.');
  const forgotTokenValue = JSON.parse(atob(forgotTokeSplit[1])).user_id;

  return (
    <>
      <Col className="LoginPage d-flex align-items-center">
        <Container className="themed-container container-custom-width" fluid="sm">
          <Col className="shadow p-4 bg-white rounded">
            <Col className="mb-3"><Logo /></Col>

            <Formik
              initialValues={{ password: '', confirmPassword: '', current_password: null }}
              validate={(values) => {
                const errors = {};
                if (!values.password) {
                  errors.password = 'Password is Required';
                } else if (values.password.length <= 6) {
                  errors.password = 'Password must be more than 6 characters';
                }
                if (!values.confirmPassword) {
                  errors.confirmPassword = 'Password is Required';
                }
                if (values.confirmPassword !== values.password) {
                  errors.confirmPassword = 'Both password need to be the same';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const allValues = (({ confirmPassword, ...o }) => o)(values);
                await dispatch(updateNewPassword({
                  data: {
                    ...allValues,
                  },
                  token,
                  forgotTokenValue,
                }))
                  .then((data) => {
                    if (data) {
                      history.push('/');
                      sendNotification('success', 'Password Update Successfully');
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
                  <Col className="text-center">
                    <h4 className="special_font">Update Password</h4>
                    <p>
                      It&apos;s good idea to use a strong password that you don&apos;t use elsewhere
                    </p>
                  </Col>
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
                    <p className="text-danger m-0">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>
                  </FormGroup>

                  <Button type="submit" className="w-100 custom_cta mt-4" disabled={isSubmitting}>Change Password</Button>
                </Form>
              )}
            </Formik>

          </Col>
        </Container>
      </Col>
    </>
  );
};

export default NewPassword;
