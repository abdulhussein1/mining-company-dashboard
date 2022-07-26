/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, FormGroup, Input, Col, Table, Label,
} from 'reactstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { ErrorMessage, FieldArray, Formik } from 'formik';
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { PrevCta } from '../../../Components/common';
import { createProjectDetailModal } from '../redux/action';
import PRODUCTION_DATA_KEY from './Constants/ProductionConst';
import TURNOVER_DATA_KEY from './Constants/TurnoverConst';
import EMPLOYEE_DETAILS from './Constants/EmployeeConst';

// eslint-disable-next-line no-unused-vars
const DetailTwo = ({ submit, initial, prev }) => {
  const {
    metaProjectDetailSegments,
    metaBusinessMiningProducts,
    createNewProject,
  } = useSelector((state) => state.dashboardReducer);
  const dispatch = useDispatch();
  const years = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < initial?.picked.length; i++) {
    const start = moment(initial[`${initial?.picked[i].toLowerCase()}startdate`]);
    const end = moment(initial[`${initial?.picked[i].toLowerCase()}enddate`]);
    while (end > start || end.format('M') === start.format('M')) {
      years.push(start.format('YYYY'));
      start.add(1, 'month');
    }
  }
  const yearSorting = _.sortedUniq(years);
  const defaultVal = initial;

  const one = [];
  const two = [];
  const three = [];
  yearSorting.forEach((eachYear) => {
    two.push({
      date_year: eachYear, usd_million: '',
    });
    three.push({
      date_year: eachYear, company_employees: '', contract_employees: '',
    });
    initial.projectTable.forEach((eachItem) => {
      one.push({
        date_year: eachYear, product: eachItem.extracted_product_id, ore_production_tonnes_per_annum: '', ore_grade_percentage: '', pure_metal_prod_tonnes_per_annum: '',
      });
    });
  });
  defaultVal.productionData = one;
  defaultVal.turnOver = two;
  defaultVal.empDetails = three;

  const detailSchemaSecond = yup.object().shape({
    // table validation
    productionData: yup.array().of(
      yup.object().shape({
        ore_production_tonnes_per_annum: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
        ore_grade_percentage: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
        pure_metal_prod_tonnes_per_annum: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
      }),
    ),
    turnOver: yup.array().of(
      yup.object().shape({
        usd_million: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
      }),
    ),
    empDetails: yup.array().of(
      yup.object().shape({
        company_employees: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
        contract_employees: yup.number().typeError('Please enter only numbers').required('Please enter the value'),
      }),
    ),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={defaultVal}
      validationSchema={detailSchemaSecond}
      onSubmit={(values) => {
        const detailOne = values.productionData.map((attributes) => ({ project_id: createNewProject?.id, segment_id: 'production_details', attributes }));
        const detailTwo = values.turnOver.map((attributes) => ({ project_id: createNewProject?.id, segment_id: 'turnover', attributes }));
        const detailThree = values.empDetails.map((attributes) => ({ project_id: createNewProject?.id, segment_id: 'employee_details', attributes }));
        // eslint-disable-next-line max-len
        Promise.all([...detailOne.map((it) => dispatch(createProjectDetailModal(it))), ...detailTwo.map((it) => dispatch(createProjectDetailModal(it))), ...detailThree.map((it) => dispatch(createProjectDetailModal(it)))]).then((d) => {
          submit(values);
        });
      }}
    >
      {({
        values,
        // errors,
        // touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Col className="p-2">

            <Col sm={12}>
              <div className="overviewTableHeading font-weight-bold mb-2">{metaProjectDetailSegments[2]?.attributes?.segment_name}</div>
              <Table bordered className="modalTable">
                <thead>
                  <tr>
                    {PRODUCTION_DATA_KEY.map((item) => (
                      <th value={item.link} key={item.link}>
                        <Label>{item.attributes.description}</Label>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <FieldArray
                    name="productionData"
                    render={() => (
                      <>
                        {values.productionData.map((data, index) => (
                          <tr key={index}>
                            <td>{data.date_year}</td>
                            <td>
                              {metaBusinessMiningProducts
                                .find((da) => da.id
                                  === parseInt(data.product, 10)).attributes.id_name}
                            </td>
                            <td>
                              <FormGroup>
                                <Input
                                  type="text"
                                  name={`productionData.${index}.ore_production_tonnes_per_annum`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage name={`productionData.${index}.ore_production_tonnes_per_annum`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                              </FormGroup>
                            </td>
                            <td>
                              <FormGroup>
                                <Input
                                  type="text"
                                  name={`productionData.${index}.ore_grade_percentage`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage name={`productionData.${index}.ore_grade_percentage`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                              </FormGroup>
                            </td>
                            <td>
                              <FormGroup>
                                <Input
                                  type="text"
                                  name={`productionData.${index}.pure_metal_prod_tonnes_per_annum`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage name={`productionData.${index}.pure_metal_prod_tonnes_per_annum`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                              </FormGroup>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  />
                </tbody>
              </Table>
            </Col>

            <Col sm={12}>
              <div className="overviewTableHeading font-weight-bold mb-2 mt-4">{metaProjectDetailSegments[3]?.attributes?.segment_name}</div>
              <Table bordered className="modalTable">
                <thead>
                  <tr>
                    {TURNOVER_DATA_KEY.map((item) => (
                      <th value={item.link} key={item.link}>
                        <Label>{item.attributes.description}</Label>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <FieldArray
                    name="turnOver"
                    render={() => (
                      <>
                        {values.turnOver.map((data, index) => (
                          <tr key={index}>
                            <td>{data.date_year}</td>
                            <td>
                              <FormGroup>
                                <Input
                                  type="text"
                                  name={`turnOver.${index}.usd_million`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage name={`turnOver.${index}.usd_million`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                              </FormGroup>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  />
                </tbody>
              </Table>
            </Col>

            <Col sm={12}>
              <div className="overviewTableHeading font-weight-bold mb-2 mt-4">{metaProjectDetailSegments[0]?.attributes?.segment_name}</div>
              <Table bordered className="modalTable">
                <thead>
                  <tr>
                    {EMPLOYEE_DETAILS.map((item) => (
                      <th value={item.link} key={item.link}>
                        <Label>{item.attributes.description}</Label>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <FieldArray
                    name="empDetails"
                    render={() => (
                      <>
                        {values.empDetails.map((data, index) => (
                          <tr key={index}>
                            <td>{data.date_year}</td>
                            <td>
                              <FormGroup>
                                <Input
                                  type="text"
                                  name={`empDetails.${index}.company_employees`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage name={`empDetails.${index}.company_employees`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                              </FormGroup>
                            </td>
                            <td>
                              <FormGroup>
                                <Input
                                  type="text"
                                  name={`empDetails.${index}.contract_employees`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <ErrorMessage name={`empDetails.${index}.contract_employees`} render={(msg) => <p className="text-danger mb-0">{msg}</p>} />
                              </FormGroup>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  />
                </tbody>
              </Table>
            </Col>

            <Col className="text-center mt-4">
              <Button type="button" onClick={prev} className="arrow_prev d-none"><PrevCta /></Button>
              <Button type="submit" className="custom_cta px-4">Next</Button>
            </Col>

          </Col>
        </Form>
      )}
    </Formik>
  );
};
DetailTwo.propTypes = {
  submit: PropTypes.func,
  prev: PropTypes.func.isRequired,
  initial: PropTypes.objectOf(PropTypes.any).isRequired,
};
DetailTwo.defaultProps = {
  submit: (() => {}),
};

export default DetailTwo;
