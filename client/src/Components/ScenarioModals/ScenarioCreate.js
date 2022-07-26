/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  Button, Form, FormGroup, Label, Input, Col,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { createNewScenarios, getScenarioList } from '../../Container/Dashboard/redux/action';
import { sendNotification } from '../../Utils/globalFunctions';

const ScenarioCreate = ({ submit, initial }) => {
  const dispatch = useDispatch();
  const {
    projectDetailData,
  } = useSelector((state) => state.dashboardReducer);
  const projectId = projectDetailData.id;

  return (
    <>
      <Formik
        initialValues={initial}
        validate={(values) => {
          const errors = {};
          if (!values.scenario_name) {
            errors.scenario_name = 'Scenario name is Required';
          }

          return errors;
        }}
        onSubmit={(values) => {
          submit(values);
          const scenarioName = values.scenario_name;
          dispatch(createNewScenarios({ projectId, scenarioName })).then((data) => {
            if (data) {
              dispatch(getScenarioList(projectId));
              sendNotification('success', 'Scenario Created Successfully', 2000, 'top-center');
            }
          });
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} className="p-2">
            <FormGroup className="mt-1">
              <Label>Scenario Name</Label>
              <Input
                type="text"
                name="scenario_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.scenario_name}
              />
              <p className="text-danger m-0">{errors.scenario_name && errors.scenario_name}</p>
            </FormGroup>

            <Col className="text-center"><Button type="submit" className="custom_cta px-4 mt-4" disabled={isSubmitting}>Create</Button></Col>
          </Form>
        )}
      </Formik>
    </>
  );
};
ScenarioCreate.propTypes = {
  submit: PropTypes.func,
  initial: PropTypes.objectOf(PropTypes.any).isRequired,
};
ScenarioCreate.defaultProps = {
  submit: (() => {}),
};

export default ScenarioCreate;
