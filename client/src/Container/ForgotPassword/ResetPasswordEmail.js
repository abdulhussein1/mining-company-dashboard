import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Col, Button, Form,
} from 'reactstrap';
import { Logo, VerifyEmail } from '../../Components/common';
import { resendEmailForgotPassword as resendForgot } from '../Register/redux/action';
import { sendNotification } from '../../Utils/globalFunctions';

const ResetPasswordLink = () => {
  const dispatch = useDispatch();
  const {
    resendEmailForgotPassword,
  } = useSelector((state) => state.registerReducer);

  const resendEmailCta = (e) => {
    dispatch(resendForgot({ login_name: resendEmailForgotPassword }));
    sendNotification('success', 'Email Resend Successfully');
    e.preventDefault();
  };
  return (
    <>
      <Col className="LoginPage d-flex align-items-center">
        <Container className="themed-container container-custom-width" fluid="sm">
          <Col className="shadow p-4 bg-white rounded">
            <Col className="mt-3 "><Logo /></Col>
            <Col className="email-verification d-flex align-items-center justify-content-center mt-4 mb-4"><VerifyEmail /></Col>

            <h3 className="text-center special_font">Verify your Email</h3>
            <span className="text-center d-block verification-subheading">We sent a password reset link to your email address</span>
            <Col sm="12" className="text-center mt-4 mb-2">
              <Form onSubmit={resendEmailCta}>
                Didn&#39;t get email? &nbsp;
                <Button type="submit" className="custom_cta">Send Again</Button>
              </Form>
            </Col>
          </Col>
        </Container>
      </Col>
    </>
  );
};

export default ResetPasswordLink;
