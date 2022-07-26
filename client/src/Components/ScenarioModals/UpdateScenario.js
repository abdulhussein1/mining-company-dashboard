/* eslint-disable camelcase */
import React from 'react';
import {
  Modal, ModalBody, ModalHeader, Button, Form, FormGroup, Label, Input, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getScenarioList, updateScenarioName } from '../../Container/Dashboard/redux/action';
import { sendNotification } from '../../Utils/globalFunctions';

const UpdateScenarioModal = ({
  open, className, close, scenario_id,
}) => {
  const dispatch = useDispatch();
  const closeBtn = <Button className="close" onClick={close}>&times;</Button>;
  const {
    projectDetailData,
  } = useSelector((state) => state.dashboardReducer);
  const projectId = projectDetailData.id;
  const scenarioId = scenario_id;

  return (
    <>
      <Modal isOpen={open} toggle={close} className={className}>
        <ModalHeader className="project_create_title" close={closeBtn}>Update Scenario</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              scenario_name: '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.scenario_name) {
                errors.scenario_name = 'Scenario name is Required';
              }

              return errors;
            }}
            // onSubmit={(values) => {
            //   close();
            //   const newName = values.name;
            //   dispatch((id, newName));
            // }}
            onSubmit={async (values, { setSubmitting }) => {
              close();
              dispatch(updateScenarioName({
                data: {
                  ...values,
                },
                projectId,
                scenarioId,
              })).then((data) => {
                if (data) {
                  sendNotification('success', 'Scenario Updated Successfully', 2000, 'top-center');
                  dispatch(getScenarioList(projectId));
                }
              });
              setSubmitting(false);
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

                <Col className="text-center"><Button type="submit" className="custom_cta px-4 mt-4" disabled={isSubmitting}>Update</Button></Col>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

UpdateScenarioModal.propTypes = {
  className: PropTypes.string,
  scenario_id: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

UpdateScenarioModal.defaultProps = {
  className: '',
};

export default UpdateScenarioModal;
