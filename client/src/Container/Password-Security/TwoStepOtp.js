import React, { useState } from 'react';
import {
  Container, Col, Button, Form, FormGroup,
} from 'reactstrap';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { userUrl } from '../../Utils/Config';

const TwoStepOtp = () => {
  const [oneTimePass, setOneTimePass] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChangeOtp = (data) => {
    if (data.length === 6) {
      setHasError(false);
    }
    setOneTimePass(data);
  };

  return (
    <>
      <Col className="LoginPage d-flex pt-5 pb-5 h-auto">
        <Container>
          <Col sm="12" md={{ size: 6, offset: 3 }} className="shadow bg-white rounded overflow-hidden">
            <Col className="faq-main-title ">Two - step verification</Col>

            <Col className="p-4">
              <Col className="plan-single-block p-4">

                <Formik
                  initialValues={{ }}
                  validate={() => {
                    const errors = {};
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      setSubmitting(false);
                      if (oneTimePass.length !== 6) {
                        setHasError(true);
                      } else {
                        setHasError(false);
                      }
                    }, 400);
                  }}
                >
                  {({
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Col className="text-center"><h4 className="mb-0 special_font">Write a code here</h4></Col>

                      <Col className="d-flex align-items-end mt-3 mb-3">
                        <FormGroup className="w-100 otp-inputs d-flex justify-content-center">
                          <OtpInput
                            value={oneTimePass}
                            onChange={handleChangeOtp}
                            numInputs={6}
                            hasErrored={hasError}
                            errorStyle="error-otp"
                            separator={<span>-</span>}
                          />
                        </FormGroup>
                      </Col>

                      <Col className="text-center"><p className="mb-0">Didn&#39;t get code ? Go back to the previous stage</p></Col>

                      <Col className="d-flex justify-content-between mt-3">
                        <Link to={`${userUrl}/send-otp`} className="btn btn-secondary px-4 transparent-cta custom_cta">Back</Link>
                        <Button type="submit" className="custom_cta px-4 text-nowrap" disabled={isSubmitting}>Verify</Button>
                      </Col>
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

export default TwoStepOtp;
