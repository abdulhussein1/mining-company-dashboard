/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  Button, Form, FormGroup, Label, Input, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

const ScenarioCopy = ({ submit, initial }) => (
  <>
    <Formik
      initialValues={initial}
      validate={(values) => {
        const errors = {};
        if (!values.scenarionamedata) {
          errors.scenarionamedata = 'Scenario name is Required';
        }
        if (!values.selectscenario) {
          errors.selectscenario = 'Select scenario is Required';
        }
        if (!values.selectmaterialissue) {
          errors.selectmaterialissue = 'Select material issue is Required';
        }

        return errors;
      }}
      onSubmit={(values) => {
        submit(values);
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
        <Form onSubmit={handleSubmit} className="p-2">
          <FormGroup className="mt-1">
            <Label for="ScenarioName">Scenario Name</Label>
            <Input
              type="select"
              name="scenarionamedata"
              id="ScenarioName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.scenarionamedata}
            >
              <option value="" disabled="disabled" defaultValue>Select Option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Input>
            <p className="text-danger m-0">{errors.scenarionamedata && touched.scenarionamedata && errors.scenarionamedata}</p>
          </FormGroup>
          <FormGroup className="mt-4">
            <Label for="SelSceneario">Select Scenario</Label>
            <Input
              type="select"
              name="selectscenario"
              id="SelSceneario"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.selectscenario}
            >
              <option value="" disabled="disabled" defaultValue>Select Option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Input>
            <p className="text-danger m-0">{errors.selectscenario && touched.selectscenario && errors.selectscenario}</p>
          </FormGroup>
          <FormGroup className="mt-4">
            <Label for="SelectMaterial">Select material issues</Label>
            <Input
              type="select"
              name="selectmaterialissue"
              id="SelectMaterial"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.selectmaterialissue}
            >
              <option value="" disabled="disabled" defaultValue>Select Option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Input>
            <p className="text-danger m-0">{errors.selectmaterialissue && touched.selectmaterialissue && errors.selectmaterialissue}</p>
          </FormGroup>

          <Col className="text-center"><Button type="submit" className="custom_cta px-4 mt-4" disabled={isSubmitting}>Copy</Button></Col>
        </Form>
      )}
    </Formik>
  </>
);

ScenarioCopy.propTypes = {
  submit: PropTypes.func,
  initial: PropTypes.objectOf(PropTypes.any).isRequired,
};
ScenarioCopy.defaultProps = {
  submit: (() => {}),
};

export default ScenarioCopy;
