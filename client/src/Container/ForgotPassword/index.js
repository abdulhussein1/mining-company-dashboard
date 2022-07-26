import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container, Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { Logo } from '../../Components/common';
import { forgotUserPassword } from '../Register/redux/action';
import { sendNotification } from '../../Utils/globalFunctions';

const ForgotPassword = () => {
  const history = useHistory();
  const formikRef = useRef();
  const dispatch = useDispatch();

  return (
    <>
      <Col className="LoginPage d-flex align-items-center">
        <Container className="themed-container container-custom-width" fluid="sm">
          <Col className="shadow p-4 bg-white rounded">
            <Col className="mb-3"><Logo /></Col>

            <Formik
              initialValues={{ email: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Email is Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address';
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                await dispatch(forgotUserPassword({ login_name: values.email })).then((data) => {
                  if (data) {
                    sendNotification('success', 'Please check your email for password reset');
                    formikRef.current?.resetForm();
                    history.push('/reset-password');
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
                    <h4 className="special_font">Forgot Your Password</h4>
                    <p>
                      No worries! just enter your email and we
                      we&apos;ll send you a reset password link
                    </p>
                  </Col>
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <p className="text-danger m-0">{errors.email && touched.email && errors.email}</p>
                  </FormGroup>

                  <Button type="submit" className="w-100 custom_cta mt-4" disabled={isSubmitting}>Send Email Verification</Button>
                </Form>
              )}
            </Formik>

          </Col>
        </Container>
      </Col>
    </>
  );
};

export default ForgotPassword;
