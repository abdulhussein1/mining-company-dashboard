import React, { useEffect } from 'react';
import {
  Container, Col, Button, Form,
} from 'reactstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo, VerifyEmail } from '../../Components/common';
import { emailVerification as sendVerificaiton, resendEmailForVerification as resendEmail } from '../Register/redux/action';
import { sendNotification } from '../../Utils/globalFunctions';

const Email = () => {
  const history = useHistory();
  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token');
  const userId = new URLSearchParams(search).get('userId');
  const dispatch = useDispatch();
  const {
    emailVerificationLoading,
    emailVerification,
    resendEmailForVerification,
  } = useSelector((state) => state.registerReducer);

  useEffect(() => {
    const initial = () => {
      if (!!token && !!userId) {
        dispatch(sendVerificaiton(token, userId));
      }
    };
    initial();
  }, [dispatch, token, userId]);

  useEffect(() => {
    if (emailVerification) {
      sendNotification('success', 'Your Email is successfully verified');
      history.push('/');
    }
  }, [emailVerification, history]);

  const verifyEmailCta = (e) => {
    dispatch(resendEmail(resendEmailForVerification));
    sendNotification('success', 'Email Resend Successfully');
    e.preventDefault();
  };

  const headLine = () => {
    if (!!token && !!userId) {
      if (emailVerificationLoading) {
        return 'Please wait we are verifying your email';
      } if (!emailVerification) {
        return 'Something went wrong';
      }
      return 'Verified';
    }
    return 'Verify Your Email';
  };

  const subHeadLine = () => {
    if (!!token && !!userId) {
      return '';
    }
    return 'Please verify your email address to get access to our tool. Thank you';
  };
  return (
    <Col className="LoginPage d-flex align-items-center">
      <Container className="themed-container container-custom-width" fluid="sm">
        <Col className="shadow p-4 bg-white rounded">
          <Col className="mt-3 "><Logo /></Col>
          <Col className="email-verification d-flex align-items-center justify-content-center mt-4 mb-4"><VerifyEmail /></Col>

          <h3 className="text-center special_font">{headLine()}</h3>
          <span className="text-center d-block verification-subheading">{subHeadLine()}</span>
          {subHeadLine() !== ''
            ? (
              <Col sm="12" className="text-center mt-4 mb-2">
                <Form onSubmit={verifyEmailCta}>
                  Didn&#39;t get email? &nbsp;
                  <Button type="submit" className="custom_cta">Send Again</Button>
                </Form>
              </Col>
            ) : null }
        </Col>
      </Container>
    </Col>
  );
};

export default Email;
