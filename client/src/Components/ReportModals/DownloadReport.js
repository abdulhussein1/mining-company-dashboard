import React from 'react';
import {
  Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, Button,
  Row, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';

const DownloadReport = ({ open, className, close }) => (
  <>
    <Modal size="lg" isOpen={open} toggle={close} className={className}>
      <ModalHeader className="report_title" toggle={close}><h5 className="primary_font mb-0">Download Reports</h5></ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            selectreports: '',
            selectframework: '',
            selectscenarios: '',
            reportingyear: '',
            materialissues: '',
            checked: [],
          }}
          validate={(values) => {
            const errors = {};
            if (!values.selectreports) {
              errors.selectreports = 'Report is Required';
            }
            if (!values.selectframework) {
              errors.selectframework = 'Framework is Required';
            }
            if (!values.selectscenarios) {
              errors.selectscenarios = 'Scenarios is Required';
            }
            if (!values.reportingyear) {
              errors.reportingyear = 'Reporting Year is Required';
            }
            if (!values.materialissues) {
              errors.materialissues = 'Material Issue is Required';
            }
            if (values.checked.length === 0) {
              errors.checked = 'Please check atleast one format';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            close();
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
              <Row className="p-2">
                <Col sm={6} className="mt-2 mb-2">
                  <FormGroup>
                    <Label for="Reports">Reports</Label>
                    <Input
                      type="select"
                      name="selectreports"
                      id="Reports"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.selectreports}
                    >
                      <option value="" disabled="disabled" defaultValue>Select Report</option>
                      <option value="1">Sustainability reports</option>
                      <option value="2">Compliance reports</option>
                      <option value="3">Impact reports</option>
                      <option value="4">Benchmark reports</option>
                      <option value="5">Scenario comparison</option>
                      <option value="6">Carbon profile</option>
                    </Input>
                    <p className="text-danger m-0">{errors.selectreports && touched.selectreports && errors.selectreports}</p>
                  </FormGroup>
                </Col>
                <Col sm={6} className="mt-2 mb-2">
                  <FormGroup>
                    <Label for="Framework">Framework</Label>
                    <Input
                      type="select"
                      name="selectframework"
                      id="Framework"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.selectframework}
                    >
                      <option value="" disabled="disabled" defaultValue>Select Framework</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </Input>
                    <p className="text-danger m-0">{errors.selectframework && touched.selectframework && errors.selectframework}</p>
                  </FormGroup>
                </Col>
                <Col sm={6} className="mt-2 mb-2">
                  <FormGroup>
                    <Label for="Scenarios">Scenarios</Label>
                    <Input
                      type="select"
                      name="selectscenarios"
                      id="Scenarios"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.selectscenarios}
                    >
                      <option value="" disabled="disabled" defaultValue>Select Scenarios</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </Input>
                    <p className="text-danger m-0">{errors.selectscenarios && touched.selectscenarios && errors.selectscenarios}</p>
                  </FormGroup>
                </Col>
                <Col sm={6} className="mt-2 mb-2">
                  <FormGroup>
                    <Label for="Reporting">Reporting Year</Label>
                    <Input
                      type="select"
                      name="reportingyear"
                      id="Reporting"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.reportingyear}
                    >
                      <option value="" disabled="disabled" defaultValue>Select Reporting Year</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </Input>
                    <p className="text-danger m-0">{errors.reportingyear && touched.reportingyear && errors.reportingyear}</p>
                  </FormGroup>
                </Col>
                <Col sm={6} className="mt-2 mb-2">
                  <FormGroup>
                    <Label for="Material">Material issues</Label>
                    <Input
                      type="select"
                      name="materialissues"
                      id="Material"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.materialissues}
                    >
                      <option value="" disabled="disabled" defaultValue>Select Material Issues</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </Input>
                    <p className="text-danger m-0">{errors.materialissues && touched.materialissues && errors.materialissues}</p>
                  </FormGroup>
                </Col>
                <Col sm={6} className="mt-2 mb-2">
                  <FormGroup>
                    <Label for="SelFormat">Select Format</Label>
                    <Col className="d-flex pt-2">
                      <Label className="d-flex me-3">
                        <Field
                          className="mt-1 me-2"
                          type="checkbox"
                          name="checked"
                          value="pdf"
                        />
                        PDF
                      </Label>
                      <Label className="d-flex me-3">
                        <Field
                          className="mt-1 me-2"
                          type="checkbox"
                          name="checked"
                          value="ms-word"
                        />
                        MS WORD
                      </Label>
                      <Label className="d-flex me-3">
                        <Field
                          className="mt-1 me-2"
                          type="checkbox"
                          name="checked"
                          value="csv"
                        />
                        CSV
                      </Label>
                    </Col>
                    <p className="text-danger m-0">{errors.checked && touched.checked && errors.checked}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Col className="text-center mb-2"><Button type="submit" className="custom_cta mt-4 px-5" disabled={isSubmitting}>Download reports</Button></Col>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  </>
);

DownloadReport.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

DownloadReport.defaultProps = {
  className: '',
};

export default DownloadReport;
