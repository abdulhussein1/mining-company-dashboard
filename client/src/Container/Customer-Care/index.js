import React from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { Formik } from 'formik';
import { ImportFile } from '../../Components/common';

const CustomerCare = () => (
  <>

    <Col className="LoginPage d-flex pt-5 pb-5 h-auto">
      <Container>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="shadow bg-white rounded overflow-hidden">
          <Col className="faq-main-title">Customer Care</Col>
          <Col className="p-4">

            <Formik
              initialValues={{
                helpoption: '', subject: '', description: '', attachment: '',
              }}
              validate={(values) => {
                const errors = {};

                if (!values.helpoption) {
                  errors.helpoption = 'Help option is required';
                }
                if (!values.subject) {
                  errors.subject = 'Subject is required';
                }
                if (!values.description) {
                  errors.description = 'Description is required';
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
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
                  <FormGroup>
                    <Label for="Helpoption">Where do you need help ?</Label>
                    <Input
                      type="select"
                      name="helpoption"
                      id="Helpoption"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.helpoption}
                    >
                      <option value="" disabled="disabled">Select Option</option>
                      <option value="1">I need help in logging in</option>
                    </Input>
                    <p className="text-danger m-0">{errors.helpoption && touched.helpoption && errors.helpoption}</p>
                  </FormGroup>
                  <FormGroup className="mt-4">
                    <Label for="Subject">Subject</Label>
                    <Input
                      type="text"
                      name="subject"
                      id="Subject"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subject}
                    />
                    <p className="text-danger m-0">{errors.subject && touched.subject && errors.subject}</p>
                  </FormGroup>
                  <FormGroup className="mt-4">
                    <Label for="Description">Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      placeholder="Describe your issue in few words"
                      className="custom_textarea"
                      id="Description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    <p className="text-danger m-0">{errors.description && touched.description && errors.description}</p>
                  </FormGroup>
                  <FormGroup className="mt-4">
                    <Label for="Attachments">Attachments</Label>
                    <Label className="doc-attachment d-flex justify-content-center">
                      <Input
                        type="file"
                        name="attachment"
                        id="Attachments"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.attachment}
                      />
                      <p className="mb-0">
                        <ImportFile />
                        <span className="ms-2">Files</span>
                      </p>
                    </Label>
                  </FormGroup>
                  <Col className="right_side_button d-flex justify-content-end"><Button type="submit" className="w-100 custom_cta mt-4" disabled={isSubmitting}>Submit</Button></Col>
                </Form>
              )}
            </Formik>

          </Col>
        </Col>

        <Row className="mt-3">
          <Col sm="12" md={{ size: 6, offset: 3 }} className="d-flex align-items-center mt-4">
            <Col sm="6" className="text-blue mt-1">
              <strong className="me-1">Phone:</strong>
              +44 2071674286
            </Col>
            <Col sm="6" className="text-blue text-right mt-1 d-flex justify-content-end">
              <strong className="me-1">Email: </strong>
              info@twooceansstrategy.com
            </Col>
          </Col>
        </Row>
      </Container>
    </Col>

  </>
);

export default CustomerCare;
