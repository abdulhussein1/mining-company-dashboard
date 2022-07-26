import React from 'react';
import {
  Container, Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { userUrl } from '../../Utils/Config';

const TwoStepPass = () => {
  const history = useHistory();
  return (
    <>
      <Col className="LoginPage d-flex pt-5 pb-5 h-auto">
        <Container>
          <Col sm="12" md={{ size: 6, offset: 3 }} className="shadow bg-white rounded overflow-hidden">
            <Col className="faq-main-title">Two - step verification</Col>

            <Col className="p-4">
              <Col className="plan-single-block p-4">

                <Formik
                  initialValues={{ password: '' }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.password) {
                      errors.password = 'Password is Required';
                    } else if (values.password.length <= 6) {
                      errors.password = 'Password must be more than 6 characters';
                    }

                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      history.push(`${userUrl}/send-otp`);
                      setSubmitting(false);
                    }, 400);
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
                      <Col className="d-flex align-items-end">
                        <FormGroup className="w-100">
                          <Label for="Password">Enter your password to set up verification</Label>
                          <Input
                            type="password"
                            name="password"
                            id="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                        </FormGroup>
                        <Button type="submit" className="custom_cta ms-3 px-4" disabled={isSubmitting}>Next</Button>
                      </Col>
                      <p className="text-danger m-0">{errors.password && touched.password && errors.password}</p>
                    </Form>
                  )}
                </Formik>

              </Col>
            </Col>
          </Col>
        </Container>
      </Col>

    </>
  );
};

export default TwoStepPass;
