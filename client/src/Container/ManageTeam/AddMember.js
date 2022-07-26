/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import Select from 'react-select';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, FieldArray, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { userUrl } from '../../Utils/Config';
import { createProjectMember } from '../Register/redux/action';
import { getUserId, sendNotification } from '../../Utils/globalFunctions';
import { getMetaMaterialIssueCategory } from '../../Components/redux/action';
import { TableDel } from '../../Components/common';

const AddMemberForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const GoBack = (e) => {
    e.preventDefault();
    history.push(`${userUrl}/manage-team`);
  };

  const {
    getProjectListing,
  } = useSelector((state) => state.dashboardReducer);
  const {
    metaMaterialIssueCategory,
  } = useSelector((state) => state.componentReducer);
  const projectAndMaterialData = metaMaterialIssueCategory.map((value) => ({ value: value.id, label: value.attributes.description }));

  useEffect(() => {
    const initialLoad = () => {
      dispatch(getMetaMaterialIssueCategory());
    };
    initialLoad();
  }, [dispatch]);

  const user_id = getUserId();

  const detailSchema = yup.object().shape({
    name: yup.string().required('Name is Required'),
    email: yup.string().email('Must be a valid email').required('Email is Required'),
    permission: yup.string().required('Permission is Required'),

    projectMaterial: yup.array().of(
      yup.object().shape({
        projectname: yup.string().required('Field is required'),
        materialissue: yup.array().min(1, 'Field is required').required('Field is required'),
      }),
    ),
  });

  return (
    <>

      <Col className="LoginPage d-flex pt-5 pb-5 h-auto">
        <Container>
          <Col sm="12" md={{ size: 6, offset: 3 }} className="shadow bg-white rounded">
            <Col className="faq-main-title">Add member</Col>
            <Col className="faq-inside p-4">
              <Formik
                initialValues={{
                  name: '',
                  permission: '',
                  email: '',
                  projectMaterial: [{
                    projectname: '',
                    materialissue: [],
                  }],
                }}
                validationSchema={detailSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  const allValues = (({
                    projectname, materialissue, ...o
                  }) => o)(values);
                  dispatch(createProjectMember({
                    project_id: allValues.projectMaterial.map((item) => parseInt(item.projectname, 10)).join(','),
                    user_id,
                  })).then((data) => {
                    if (data) {
                      sendNotification('success', 'Request Send Successfully', 1000, 'center-top');
                    }
                  });
                  setSubmitting(false);
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
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="Name">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <p className="text-danger m-0">{errors.name && touched.name && errors.name}</p>
                    </FormGroup>
                    <FormGroup className="mt-4">
                      <Label for="Email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <p className="text-danger m-0">{errors.email && touched.email && errors.email}</p>
                    </FormGroup>
                    <FormGroup className="mt-4">
                      <Label for="Permission">Permission Level</Label>
                      <Input
                        type="select"
                        name="permission"
                        id="Permission"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.permission}
                      >
                        <option value="" disabled="disabled" defaultValue>Select Option</option>
                        <option value="1">Admin</option>
                        <option value="2">Edit</option>
                        <option value="3">Download</option>
                        <option value="3">View</option>
                      </Input>
                      <p className="text-danger m-0">{errors.permission && touched.permission && errors.permission}</p>
                    </FormGroup>

                    <Col sm="12" className="mt-4"><Label for="Access">Project &amp; Material issues Access</Label></Col>

                    <FieldArray
                      name="projectMaterial"
                      render={(arrayHelpers) => (
                        <>
                          {values.projectMaterial.map((projectMaterialList, index) => (
                            <Row key={index}>
                              <Col sm={index > 0 ? '6' : '6'}>
                                <FormGroup className="mb-2">
                                  <Input
                                    type="select"
                                    name={`projectMaterial.${index}.projectname`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    defaultValue=""
                                    // value={values.projectname}
                                  >
                                    <option value="" disabled="disabled" defaultValue>Select Option</option>
                                    {getProjectListing.map((item) => (
                                      <option value={item.id} key={item.id}>
                                        {item.attributes.name}
                                      </option>
                                    ))}
                                  </Input>
                                  <ErrorMessage name={`projectMaterial.${index}.projectname`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                </FormGroup>
                              </Col>
                              <Col sm={index > 0 ? '5' : '6'}>
                                <FormGroup className="mb-2">
                                  <Select
                                    placeholder="Select Materials"
                                    closeMenuOnSelect={false}
                                    isMulti
                                    name={`projectMaterial.${index}.materialissue`}
                                    id="materialIssue"
                                    onChange={(val) => setFieldValue(`projectMaterial.${index}.materialissue`, val)}
                                    onBlur={handleBlur}
                                    // value={values.materialissue}
                                    options={projectAndMaterialData}
                                  />
                                  <ErrorMessage name={`projectMaterial.${index}.materialissue`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                </FormGroup>
                              </Col>
                              {index > 0
                                ? (
                                  <Col sm="1 p-0">
                                    <Button
                                      type="button"
                                      className="px-2 bg-grey del_cta"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <TableDel />
                                    </Button>
                                  </Col>
                                ) : null }
                            </Row>
                          ))}
                          <Button
                            type="button"
                            className="custom_cta px-3 transparent-cta transparent-btn mt-2"
                            onClick={() => arrayHelpers.push({
                              materialissue: [],
                              projectname: '',
                            })}
                          >
                            + Add More
                          </Button>
                        </>
                      )}
                    />

                    <hr className="mt-4 mb-4" />
                    <Col className="right_side_button d-flex justify-content-between">
                      <Button className="custom_cta px-4 transparent-cta transparent-btn" onClick={GoBack}>Back</Button>
                      <Button type="submit" className="w-100 custom_cta upgrade-subscription" disabled={isSubmitting}>Add</Button>
                    </Col>
                  </Form>
                )}
              </Formik>
            </Col>
          </Col>
        </Container>
      </Col>

    </>
  );
};

export default AddMemberForm;
