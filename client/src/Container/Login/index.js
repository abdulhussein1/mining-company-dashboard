import React, { useEffect } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../../Components/common';
import { userLogin, autoLoginToken } from '../Register/redux/action';
import { portalUrl } from '../../Utils/Config';
import { sendNotification } from '../../Utils/globalFunctions';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.registerReducer);
  const getResultURL = window.location.search;
  const resultPage = () => { history.push(window.location.pathname); };

  if (window.location.href.indexOf('?error') > -1) {
    resultPage();
    const sliceErrorMessage = getResultURL.slice(7, getResultURL.length).replace(/%20/g, ' ');
    sendNotification('error', sliceErrorMessage, 10000);
  } else if (window.location.href.indexOf('?success') > -1) {
    resultPage();
    const sliceSuccessMessage = getResultURL.slice(9, getResultURL.length).replace(/%20/g, ' ');
    sendNotification('success', sliceSuccessMessage, 10000);
  }

  const { search } = useLocation();
  const forgotToken = new URLSearchParams(search).get('auto-login-token');
  // const forgotTokeSplit = forgotToken.split('.');
  // const forgotTokenValue = JSON.parse(atob(forgotTokeSplit[1])).user_id;
  useEffect(() => {
    const initial = () => {
      if (forgotToken) {
        dispatch(autoLoginToken(forgotToken));
        history.push('/new-password');
      }
    };
    initial();
  }, [userToken, history, dispatch, forgotToken]);

  return (
    <Col className="LoginPage d-flex align-items-center">
      <Container className="themed-container container-custom-width" fluid="sm">
        <Col className="shadow p-4 bg-white rounded">
          <Col className="mb-3"><Logo /></Col>

          <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email is Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address';

              if (!values.password) {
                errors.password = 'Password is Required';
              } else if (values.password.length <= 6) {
                errors.password = 'Password must be more than 6 characters';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              dispatch(userLogin({ login_name: values.email, password: values.password }))
                .then((data) => {
                  if (data) {
                    history.push(`${portalUrl}/dashboard`);
                    sendNotification('success', 'Login Successfully', 1000, 'center-top');
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
                <FormGroup className="mt-4">
                  <Label for="Password">Password</Label>
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
                <Button type="submit" className="w-100 custom_cta mt-4" disabled={isSubmitting}>Log in</Button>
              </Form>
            )}
          </Formik>
          <Row className="mt-3">
            <Col sm="6">
              <Link to="/forgot-password" className="custom-anchor">Forgot Password?</Link>
            </Col>
            <Col sm="6" className="d-flex justify-content-end">
              Don&#39;t have an account? &nbsp;
              <Link to="/register" className="custom-anchor">Sign up</Link>
            </Col>
          </Row>

        </Col>
      </Container>
    </Col>
  );
};

export default Login;
