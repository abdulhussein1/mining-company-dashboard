import React from 'react';
import { Container, Col, Button } from 'reactstrap';

const Biling = () => (
  <>

    <Col className="LoginPage d-flex pt-5 pb-5 h-auto">
      <Container>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="shadow bg-white rounded overflow-hidden">
          <Col className="faq-main-title">Biling</Col>
          <Col className="faq-inside p-4">
            <h4 className="mt-2 mb-3 special_font">Subscription</h4>
            <Col className="plan-single-block">
              <Col className="your-plan">Your Plan</Col>
              <Col className="px-4 pt-4"><h4 className="mb-0 special_font">Annual Plan</h4></Col>
              <Col className="month-range-area p-4">
                <span>11/07/20</span>
                <span>11/07/21</span>
                <Col sm="12" className="progressbar">
                  <Col className="inside" />
                </Col>
                <Col className="all-months">
                  <ul>
                    <li>Jan</li>
                    <li>Feb</li>
                    <li>Mar</li>
                    <li>Apr</li>
                    <li>May</li>
                    <li>Jun</li>
                    <li>Jul</li>
                    <li>Aug</li>
                    <li>Sep</li>
                    <li>Oct</li>
                    <li>Nov</li>
                    <li>Dec</li>
                  </ul>
                </Col>
              </Col>
              <Col className="right_side_button d-flex justify-content-end p-4 pt-0">
                <Button type="submit" className="w-100 custom_cta upgrade-subscription">Upgrade</Button>
              </Col>
            </Col>

            <Col className="plan-single-block mt-4">
              <Col className="px-4 pt-4"><h4 className="mb-0 special_font">Cancel Plan</h4></Col>
              <Col className="p-4 cancel-note">Once you cancel your subscription, you will lose access to premium features.</Col>
              <Col className="right_side_button d-flex justify-content-end p-4 pt-0">
                <Button type="submit" className="w-100 cancel-subscription">Cancel Subscription</Button>
              </Col>
            </Col>
          </Col>
        </Col>
      </Container>
    </Col>

  </>
);

export default Biling;
