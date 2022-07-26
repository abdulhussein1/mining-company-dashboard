import React from 'react';
import {
  Container, Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { userUrl } from '../../Utils/Config';

const TwoStepPhone = () => {
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
                  initialValues={{ phonenumber: '' }}
                  validate={(values) => {
                    const errors = {};

                    if (!values.phonenumber) {
                      errors.phonenumber = 'Phone Number is Required';
                    } else if (!/[+-]?\d+(?:[.,]\d+)?$/i.test(values.phonenumber)) {
                      errors.phonenumber = 'Invalid Phone Number';
                    }

                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      history.push(`${userUrl}/enter-otp`);
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
                      <Col className="text-center mb-4">
                        <h4 className="mb-0 special_font">SMS Verification</h4>
                        <p>Enter your registered phone number </p>
                      </Col>
                      <Col className="d-flex align-items-end">
                        <FormGroup className="w-100">
                          <Label for="PhoneNumber">Phone Number</Label>
                          <Input
                            type="text"
                            name="phonenumber"
                            id="PhoneNumber"
                                                        // maxLength={10}
                            pattern="[+-]?\d+(?:[.,]\d+)?"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phonenumber}
                          />
                        </FormGroup>
                        <Button type="submit" className="custom_cta ms-3 px-4 text-nowrap" disabled={isSubmitting}>Send Code</Button>
                      </Col>
                      <p className="text-danger m-0">{errors.phonenumber && touched.phonenumber && errors.phonenumber}</p>
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

export default TwoStepPhone;
