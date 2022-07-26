/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, FormGroup, Label, Input, Col, UncontrolledTooltip, Row, Table,
} from 'reactstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import InputMask from 'react-input-mask';
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {
  Formik, Field, FieldArray, ErrorMessage,
} from 'formik';
import { DatePicker } from 'antd';
import { PrevCta, TableDel } from '../../../Components/common';
import { getScopeIdWithName, getYearDifference } from '../../../Utils/globalFunctions';
import {
  createProjectDetailModal,
  createProjectPhasesDuration,
  getMetaBusinessMiningProducts,
  getMetaProjectDetailDataKeys,
  getMetaUnitOfPhysicalMeasure, getProjectPhases, getMetaProjectDetailSegments,
} from '../redux/action';
import PROJECT_DETAIL_DATA_KEY_ONE from './Constants/ProjectDetailDataKeyConstant';

const Detail = ({ submit, initial, prev }) => {
  const dispatch = useDispatch();
  const {
    projectPhasesData,
    metaBusinessMiningProducts,
    metaUnitOfPhysicalMeasure,
    createNewProject,
    // metaProjectDetailSegments,
    // metaProjectDetailDataKeys,
  } = useSelector((state) => state.dashboardReducer);

  useEffect(() => {
    const initialLoad = () => {
      dispatch(getProjectPhases());
      dispatch(getMetaBusinessMiningProducts());
      dispatch(getMetaUnitOfPhysicalMeasure());
      dispatch(getMetaProjectDetailSegments());
      dispatch(getMetaProjectDetailDataKeys());
    };
    initialLoad();
  }, [dispatch]);

  const detailSchema = yup.object().shape({
    picked: yup.array().min(1, 'Please Select atleast one value'),

    // exploration
    explorationstartdate: yup.date('End date is Required').when('picked', (picked, schema) => {
      if (picked.includes('Exploration')) {
        return schema.required('Start date is Required');
      }
      return schema;
    }),
    explorationenddate: yup.date('End date is Required').when(['picked', 'explorationstartdate'], (picked, explorationstartdate, schema) => {
      if (picked.includes('Exploration') && explorationstartdate) {
        return schema.min(new Date(explorationstartdate), 'End date should be greater than start date').required('End date is Required');
      }
      return schema;
    }),

    // construction
    constructionstartdate: yup.date().when(['picked', 'explorationenddate'], (picked, explorationenddate, schema) => {
      if (picked.includes('Construction') && explorationenddate) {
        return schema.required('Start date is Required').min(new Date(explorationenddate), 'Start date should be greater exploration end date');
      }
      if (picked.includes('Construction')) {
        return schema.required('Start date is Required');
      }
      return schema;
    }),
    constructionenddate: yup.date().when(['picked', 'constructionstartdate'], (picked, constructionstartdate, schema) => {
      if (picked.includes('Construction') && constructionstartdate) {
        return schema.min(new Date(constructionstartdate), 'End date should be greater than start date').required('End date is Required');
      }
      return schema;
    }),

    // operation
    operationstartdate: yup.date().when(['picked', 'constructionenddate'], (picked, constructionenddate, schema) => {
      if (picked.includes('Operation') && constructionenddate) {
        return schema.required('Start date is Required').min(new Date(constructionenddate), 'Start date should be greater site design and construction end date');
      }
      if (picked.includes('Operation')) {
        return schema.required('Start date is Required');
      }
      return schema;
    }),
    operationenddate: yup.date().when(['picked', 'operationstartdate'], (picked, operationstartdate, schema) => {
      if (picked.includes('Operation') && operationstartdate) {
        return schema.min(new Date(operationstartdate), 'End date should be greater than start date').required('End date is Required');
      }
      return schema;
    }),

    // closure
    closurestartdate: yup.date().when(['picked', 'operationenddate'], (picked, operationenddate, schema) => {
      if (picked.includes('Closure') && operationenddate) {
        return schema.required('Start date is Required').min(new Date(operationenddate), 'Start date should be greater operations end date');
      }
      if (picked.includes('Closure')) {
        return schema.required('Start date is Required');
      }
      return schema;
    }),
    closureenddate: yup.date().when(['picked', 'closurestartdate'], (picked, closurestartdate, schema) => {
      if (picked.includes('Closure') && closurestartdate) {
        return schema.min(new Date(closurestartdate), 'End date should be greater than start date').required('End date is Required');
      }
      return schema;
    }),

    // post closure
    postclosurestartdate: yup.date().when(['picked', 'closureenddate'], (picked, closureenddate, schema) => {
      if (picked.includes('postClosure') && closureenddate) {
        return schema.required('Start date is Required').min(new Date(closureenddate), 'Start date should be greater final closure and decommissioning end date');
      }
      if (picked.includes('postClosure')) {
        return schema.required('Start date is Required');
      }
      return schema;
    }),
    postclosureenddate: yup.date().when(['picked', 'postclosurestartdate'], (picked, postclosurestartdate, schema) => {
      if (picked.includes('postClosure') && postclosurestartdate) {
        return schema.min(new Date(postclosurestartdate), 'End date should be greater than start date').required('End date is Required');
      }
      return schema;
    }),

    // table validation
    projectTable: yup.array().of(
      yup.object().shape({
        extracted_product_id: yup.string().required('Please select the value'),
        unit_of_physical_measure_id: yup.string().required('Please select the value'),
        estimated_ore_resources: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
        avg_purity_ore_percentage: yup.string().required('Please enter the value'),
      }),
    ),
  });

  return (
    <Formik
      initialValues={initial}
      validationSchema={detailSchema}
      onSubmit={(values) => {
        const phaseData = values.picked.map((item) => ({
          // eslint-disable-next-line radix
          phase_id: parseInt(getScopeIdWithName(item)), project_id: createNewProject?.id, start_date: moment(values[`${item.toLowerCase()}startdate`]).format('YYYY-MM-DD'), end_date: moment(values[`${item.toLowerCase()}enddate`]).format('YYYY-MM-DD'), business_industry_id: createNewProject?.business_industry_id,
        }));
        const detailData = values.projectTable.map((attributes) => ({
          project_id: createNewProject?.id, segment_id: 'mining_products', attributes,
        }));
        Promise.all([...phaseData.map((it) => dispatch(createProjectPhasesDuration(it))), ...detailData.map((it) => dispatch(createProjectDetailModal(it)))]).then((d) => {
        });
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
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Col className="p-2">
            <FormGroup>
              <Label className="mb-2">Phases</Label>
              <Col className="mb-2 custom_inputs">
                <Field
                  type="checkbox"
                  name="picked"
                  id="pickvallabel"
                  value="Exploration"
                  className="mt-0 me-3"
                />
                <Label>
                  {projectPhasesData[0]?.attributes?.description}
                  <span className="ms-2" id="explore">&#9432;</span>
                  <UncontrolledTooltip placement="top" target="explore">
                    Demo data
                  </UncontrolledTooltip>
                </Label>
                <div className="additional_data mt-3">
                  <Row>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>Start date</Label>
                        <DatePicker
                          picker="month"
                          format="MM/YYYY"
                          className="form-control"
                          type="text"
                          name="explorationstartdate"
                          onChange={(date) => setFieldValue('explorationstartdate', date)}
                          onBlur={handleBlur}
                          value={values.explorationstartdate}
                        />
                        <p className="text-danger m-0">{errors.explorationstartdate && touched.explorationstartdate && errors.explorationstartdate}</p>
                      </FormGroup>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>End date</Label>
                        <DatePicker
                          type="text"
                          picker="month"
                          format="MM/YYYY"
                          className="form-control"
                          name="explorationenddate"
                          onChange={(date) => setFieldValue('explorationenddate', date)}
                          onBlur={handleBlur}
                          value={values.explorationenddate}
                        />
                        <p className="text-danger m-0">{errors.explorationenddate && touched.explorationenddate && errors.explorationenddate}</p>
                      </FormGroup>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>No. of years</Label>
                        <Input
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={getYearDifference(
                            values.explorationstartdate, values.explorationenddate,
                          )}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col className="mb-2 custom_inputs">
                <Field
                  type="checkbox"
                  id="construclabel"
                  name="picked"
                  value="Construction"
                  className="mt-0 me-3"
                />
                <Label>
                  {projectPhasesData[1]?.attributes?.description}
                  <span className="ms-2" id="construc">&#9432;</span>
                  <UncontrolledTooltip placement="top" target="construc">
                    Demo data
                  </UncontrolledTooltip>
                </Label>
                <div className="additional_data mt-3">
                  <Row>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>Start date</Label>
                        <DatePicker
                          picker="month"
                          format="MM/YYYY"
                          className="form-control"
                          type="text"
                          name="constructionstartdate"
                          onChange={(date) => setFieldValue('constructionstartdate', date)}
                          onBlur={handleBlur}
                          value={values.constructionstartdate}
                        />
                        <p className="text-danger m-0">{errors.constructionstartdate && touched.constructionstartdate && errors.constructionstartdate}</p>
                      </FormGroup>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>End date</Label>
                        <DatePicker
                          type="text"
                          picker="month"
                          format="MM/YYYY"
                          className="form-control"
                          name="constructionenddate"
                          onChange={(date) => setFieldValue('constructionenddate', date)}
                          onBlur={handleBlur}
                          value={values.constructionenddate}
                        />
                        <p className="text-danger m-0">{errors.constructionenddate && touched.constructionenddate && errors.constructionenddate}</p>
                      </FormGroup>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>No. of years</Label>
                        <Input
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={getYearDifference(
                            values.constructionstartdate, values.constructionenddate,
                          )}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col className="mb-2 custom_inputs">
                <Field
                  type="checkbox"
                  id="operationlabel"
                  name="picked"
                  value="Operation"
                  className="mt-0 me-3"
                />
                <Label>
                  {projectPhasesData[2]?.attributes?.description}
                  <span className="ms-2" id="operation">&#9432;</span>
                  <UncontrolledTooltip placement="top" target="operation">
                    Demo data
                  </UncontrolledTooltip>
                </Label>
                <div className="additional_data mt-3">
                  <Row>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>Start date</Label>
                        <DatePicker
                          picker="month"
                          format="MM/YYYY"
                          className="form-control"
                          type="text"
                          name="operationstartdate"
                          onChange={(date) => setFieldValue('operationstartdate', date)}
                          onBlur={handleBlur}
                          value={values.operationstartdate}
                        />
                        <p className="text-danger m-0">{errors.operationstartdate && touched.operationstartdate && errors.operationstartdate}</p>
                      </FormGroup>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>End date</Label>
                        <DatePicker
                          type="text"
                          picker="month"
                          format="MM/YYYY"
                          className="form-control"
                          name="operationenddate"
                          onChange={(date) => setFieldValue('operationenddate', date)}
                          onBlur={handleBlur}
                          value={values.operationenddate}
                        />
                        <p className="text-danger m-0">{errors.operationenddate && touched.operationenddate && errors.operationenddate}</p>
                      </FormGroup>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>No. of years</Label>
                        <Input
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={getYearDifference(
                            values.operationstartdate, values.operationenddate,
                          )}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col className="mb-2 custom_inputs">
                <Field
                  type="checkbox"
                  id="closurelabel"
                  name="picked"
                  value="Closure"
                  className="mt-0 me-3"
                />
                <Label>
                  {projectPhasesData[3]?.attributes?.description}
                  <span className="ms-2" id="closure">&#9432;</span>
                  <UncontrolledTooltip placement="top" target="closure">
                    Demo data
                  </UncontrolledTooltip>
                </Label>
                <div className="additional_data mt-3">
                  <Row>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>Start date</Label>
                        <DatePicker
                          picker="month"
                          format="MM/YYYY"
                          className="form-control"
                          type="text"
                          name="closurestartdate"
                          onChange={(date) => setFieldValue('closurestartdate', date)}
                          onBlur={handleBlur}
                          value={values.closurestartdate}
                        />
                        <p className="text-danger m-0">{errors.closurestartdate && touched.closurestartdate && errors.closurestartdate}</p>
                      </FormGroup>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>End date</Label>
                        <DatePicker
                          type="text"
                          picker="month"
                          format="MM/YYYY"
                          className="form-control"
                          name="closureenddate"
                          onChange={(date) => setFieldValue('closureenddate', date)}
                          onBlur={handleBlur}
                          value={values.closureenddate}
                        />
                        <p className="text-danger m-0">{errors.closureenddate && touched.closureenddate && errors.closureenddate}</p>
                      </FormGroup>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>No. of years</Label>
                        <Input
                          type="text"
                          disabled
                          value={getYearDifference(values.closurestartdate, values.closureenddate)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col className="mb-2 custom_inputs">
                <Field
                  type="checkbox"
                  id="postclosurelabel"
                  name="picked"
                  value="postClosure"
                  className="mt-0 me-3"
                />
                <Label>
                  {projectPhasesData[4]?.attributes?.description}
                  <span className="ms-2" id="psclosure">&#9432;</span>
                  <UncontrolledTooltip placement="top" target="psclosure">
                    Demo data
                  </UncontrolledTooltip>
                </Label>
                <div className="additional_data mt-3">
                  <Row>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>Start date</Label>
                        <DatePicker
                          type="text"
                          picker="month"
                          format="MM/YYYY"
                          className="form-control"
                          name="postclosurestartdate"
                          onChange={(date) => setFieldValue('postclosurestartdate', date)}
                          onBlur={handleBlur}
                          value={values.postclosurestartdate}
                        />
                        <p className="text-danger m-0">{errors.postclosurestartdate && touched.postclosurestartdate && errors.postclosurestartdate}</p>
                      </FormGroup>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>End date</Label>
                        <DatePicker
                          type="text"
                          picker="month"
                          format="MM/YYYY"
                          className="form-control"
                          name="postclosureenddate"
                          onChange={(date) => setFieldValue('postclosureenddate', date)}
                          onBlur={handleBlur}
                          value={values.postclosureenddate}
                        />
                        <p className="text-danger m-0">{errors.postclosureenddate && touched.postclosureenddate && errors.postclosureenddate}</p>
                      </FormGroup>
                    </Col>
                    <Col sm={4} className="mb-3">
                      <FormGroup>
                        <Label>No. of years</Label>
                        <Input
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={getYearDifference(
                            values.postclosurestartdate, values.postclosureenddate,
                          )}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Col>
              <p className="text-danger m-0">{errors.picked && touched.picked && errors.picked}</p>
            </FormGroup>

            <Row>
              <Col sm={12} className="mt-3">
                <FormGroup>
                  <Label>Reporting Period Format</Label>
                  <Input
                    type="select"
                    name="reportingPeriod"
                    id="reportingPeriod"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.reportingPeriod}
                  >
                    <option value="" disabled="disabled" defaultValue>Select</option>
                    <option value="1">January to December</option>
                    <option value="2">April to March</option>
                    <option value="3">June to May</option>
                  </Input>
                  <p className="text-danger m-0">{errors.reportingPeriod && touched.reportingPeriod && errors.reportingPeriod}</p>
                </FormGroup>
              </Col>

              <Col sm={12} className="mt-4">
                <Table striped bordered className="modalTable detailModalPart">
                  <thead>
                    <tr>
                      {PROJECT_DETAIL_DATA_KEY_ONE.map((item) => (
                        <th value={item.link} key={item.link}>
                          <Label>{item.attributes.description}</Label>
                        </th>
                      ))}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <FieldArray
                      name="projectTable"
                      render={(arrayHelpers) => (
                        <>
                          {values.projectTable.map((data, index) => (
                            <tr key={index}>
                              <td>
                                <FormGroup>
                                  <Input
                                    type="select"
                                    name={`projectTable.${index}.extracted_product_id`}
                                    defaultValue=""
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option value="" disabled="disabled">Select</option>
                                    {metaBusinessMiningProducts.map((item) => (
                                      <option value={item.id} key={item.id}>
                                        {item.attributes.id_name}
                                      </option>
                                    ))}
                                  </Input>
                                  <ErrorMessage name={`projectTable.${index}.extracted_product_id`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                </FormGroup>
                              </td>
                              <td>
                                <FormGroup>
                                  <Input
                                    type="select"
                                    name={`projectTable.${index}.unit_of_physical_measure_id`}
                                    onChange={handleChange}
                                    defaultValue=""
                                    onBlur={handleBlur}
                                  >
                                    <option value="" disabled="disabled">Select</option>
                                    {metaUnitOfPhysicalMeasure.map((item) => (
                                      <option value={item.id} key={item.id}>
                                        {item.attributes.id_name}
                                      </option>
                                    ))}
                                  </Input>
                                  <ErrorMessage name={`projectTable.${index}.unit_of_physical_measure_id`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                </FormGroup>
                              </td>
                              <td>
                                <FormGroup>
                                  <Input
                                    type="text"
                                    name={`projectTable.${index}.estimated_ore_resources`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  <ErrorMessage name={`projectTable.${index}.estimated_ore_resources`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                </FormGroup>
                              </td>
                              <td>
                                <FormGroup>
                                  <Input
                                    type="text"
                                    name={`projectTable.${index}.avg_purity_ore_percentage`}
                                    mask="999%"
                                    maskChar=" "
                                    tag={InputMask}
                                    onChange={(evt) => {
                                      if (parseInt(evt.target.value, 10) <= 100) { setFieldValue(`projectTable.${index}.avg_purity_ore_percentage`, evt.target.value); }
                                      if (Number.isNaN(parseInt(evt.target.value, 10))) { setFieldValue(`projectTable.${index}.avg_purity_ore_percentage`, ''); }
                                    }}
                                    value={values.projectTable[index].avg_purity_ore_percentage}
                                    onBlur={handleBlur}
                                  />
                                  <ErrorMessage name={`projectTable.${index}.avg_purity_ore_percentage`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                                </FormGroup>
                              </td>
                              <td>
                                <Button
                                  type="button"
                                  className="px-2 bg-grey del_cta"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <TableDel />
                                </Button>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="4">
                              <Button
                                type="button"
                                className="custom_cta px-4"
                                onClick={() => arrayHelpers.push({
                                  extracted_product_id: '',
                                  unit_of_physical_measure_id: '',
                                  estimated_ore_resources: '',
                                  avg_purity_ore_percentage: '',
                                })}
                              >
                                Add +
                              </Button>
                            </td>
                          </tr>
                        </>
                      )}
                    />
                  </tbody>
                </Table>
                {/* .ensure().compact((v) => !v.extracted_product_id || !v.unit_of_physical_measure_id || !v.avg_purity_ore_percentage || !v.estimated_ore_resources)
                .min(1, 'Please add atleast one value'),
                <ErrorMessage name="projectTable" render={(msg) => <p className="text-danger mb-0">{msg}</p>} /> */}
              </Col>
            </Row>

            <Col className="text-center mt-4">
              <Button type="button" onClick={prev} className="arrow_prev"><PrevCta /></Button>
              <Button type="submit" className="custom_cta px-4">Next</Button>
            </Col>
          </Col>
        </Form>
      )}
    </Formik>
  );
};
Detail.propTypes = {
  submit: PropTypes.func,
  prev: PropTypes.func.isRequired,
  initial: PropTypes.objectOf(PropTypes.any).isRequired,
};
Detail.defaultProps = {
  submit: (() => {}),
};

export default Detail;
