/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Row, Col, FormGroup, Input, Button, Label,
} from 'reactstrap';
import { Form, Formik } from 'formik';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import ChartAndTable from './ChartAndTable';
import { getDashboardData, getMaterialIssueChild, saveFilterValues } from '../redux/action';
import DownloadReportButton from '../ReportModals/DownloadReportButton';
import GoBackCta from '../GoBackCta';
import { getPhasesNameWIthId } from '../../Utils/globalFunctions';
import { NoDataImage } from '../common';
import BreadCrumb from '../BreadCrumb';
import { portalUrl } from '../../Utils/Config';

const ReportDashboard = () => {
  const dispatch = useDispatch();
  const [allData, setAllData] = useState([]);
  const {
    projectDetailData,
    scenarioList,
    getProjectPhasesDuration,
  } = useSelector((state) => state.dashboardReducer);
  const projectId = projectDetailData.id;

  const {
    getDashboardAllData,
    metaMaterialIssueEnvironment,
    metaMaterialIssueSocial,
    metaMaterialIssueGovernance,
    getMaterialChildLevel,
    saveStaticFilter,
  } = useSelector((state) => state.componentReducer);

  const breadCrumb = [
    {
      active: false,
      link: `${portalUrl}/dashboard`,
      name: 'Home',
    },
    {
      active: false,
      link: '',
      name: `${projectDetailData.attributes.name}`,
    },
    {
      active: true,
      link: 'dashboard',
      name: 'Dashboard',
    },
  ];

  const initialValues = {
    selecttypeone: '',
    selectframework: '',
    selectscenario: '',
    materialIssuesList: '',
    selectreportingyear: '',
    materialIssuesChild: [],
  };
  const detailSchema = yup.object().shape({
    selectscenario: yup.string().required('Please select the value'),
    materialIssuesList: yup.string().required('Please select the value'),
  });

  const [initial, setInitials] = useState(initialValues);
  useEffect(() => {
    if (saveStaticFilter) {
      const newInitial = {
        ...saveStaticFilter,
      };
      setInitials(newInitial);
    }
  // eslint-disable-next-line no-plusplus
  }, [saveStaticFilter, setInitials]);

  const getMeterialChildLevels = (materialIssueId) => {
    dispatch(getMaterialIssueChild(materialIssueId));
    const ele = document.getElementsByName('materialIssuesChild');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ele.length; i++) { ele[i].checked = false; }
  };

  useEffect(() => {
    const uniques = _.uniq(_.map(getDashboardAllData, 'attributes.data_key'));
    setAllData(uniques);
  }, [getDashboardAllData]);

  return (
    <Col className="dashboard_area">

      <Row className="pt-2 pb-2">
        <BreadCrumb breadCrumb={breadCrumb} />
        <Col className="d-flex align-items-center justify-content-end report_and_download">
          <DownloadReportButton />
          <GoBackCta />
        </Col>
      </Row>

      <Col sm={12} className="filter-area mt-3 mb-4">
        <Col className="shadow p-3 bg-white rounded">
          <Formik
            enableReinitialize
            initialValues={initial}
            validationSchema={detailSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const selectedKey = ['project_id', 'scenario_id', 'material_issue_id'];
                if (values.selectreportingyear) {
                  selectedKey.push('phase_id');
                } if (values.materialIssuesChild?.length > 0 && values.materialIssuesChild[0] !== 'all') {
                  selectedKey.push('material_issue_child_level');
                }
                const selectedVal = [projectId, values.selectscenario, values.materialIssuesList];
                if (values.selectreportingyear) {
                  selectedVal.push(values.selectreportingyear);
                } if (values.materialIssuesChild?.length > 0 && values.materialIssuesChild[0] !== 'all') {
                  selectedVal.push(values.materialIssuesChild[0]);
                }
                const checkParams = {
                  action: 'filter',
                  'filter-keys': `${selectedKey.join(',')}`,
                  'filter-values': `${selectedVal.join(',')}`,
                };
                dispatch(getDashboardData(checkParams));

                const filterAllData = Object.assign(values, { projectVal: `${projectId}` });
                dispatch(saveFilterValues(filterAllData));
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
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="custom_blocks_width ">
                  <Col sm={2} className="mb-2">
                    <FormGroup>
                      <Input
                        type="select"
                        name="selecttypeone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.selecttypeone}
                      >
                        <option value="sustainability_reporting">Sustainability Reporting</option>
                      </Input>
                      <p className="text-danger m-0">{errors.selecttypeone && touched.selecttypeone && errors.selecttypeone}</p>
                    </FormGroup>
                  </Col>
                  <Col sm={2} className="mb-2">
                    <FormGroup>
                      <Input
                        type="select"
                        name="selectframework"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.selectframework}
                      >
                        <option value="compass">Compass</option>
                      </Input>
                      <p className="text-danger m-0">{errors.selectframework && touched.selectframework && errors.selectframework}</p>
                    </FormGroup>
                  </Col>
                  <Col sm={2} className="mb-2">
                    <FormGroup>
                      <Input
                        type="select"
                        name="selectscenario"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.selectscenario}
                      >
                        <option value="">Select Scenarios</option>
                        {scenarioList.map((item) => (
                          <option value={item.id.scenario_id} key={item.id.scenario_id}>
                            {item.attributes.scenario_name}
                          </option>
                        ))}
                      </Input>
                      <p className="text-danger m-0">{errors.selectscenario && touched.selectscenario && errors.selectscenario}</p>
                    </FormGroup>
                  </Col>
                  <Col sm={2} className="mb-2">
                    <FormGroup>
                      <Input
                        type="select"
                        name="selectreportingyear"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.selectreportingyear}
                      >
                        <option value="">Select All Duration</option>
                        {getProjectPhasesDuration.map((item, i) => (
                          <option value={item.id.phase_id} key={i}>
                            {getPhasesNameWIthId({ id: item.id.phase_id })}
                          </option>
                        ))}
                      </Input>
                      <p className="text-danger m-0">{errors.selectreportingyear && touched.selectreportingyear && errors.selectreportingyear}</p>
                    </FormGroup>
                  </Col>
                  <Col sm={2} className="mb-2">
                    <FormGroup>
                      <Input
                        type="select"
                        name="materialIssuesList"
                        onChange={(e) => {
                          handleChange(e);
                          getMeterialChildLevels(e.target.value);
                          setFieldValue('materialIssuesChild', []);
                        }}
                        onBlur={handleBlur}
                        value={values.materialIssuesList}
                      >
                        <option value="">Select Material Categories</option>
                        <optgroup label="Environment">
                          {metaMaterialIssueEnvironment.map((item, i) => (
                            <option value={item.id} key={i}>
                              {item.attributes.id_name}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Governance">
                          {metaMaterialIssueGovernance.map((item, i) => (
                            <option value={item.id} key={i}>
                              {item.attributes.id_name}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Social">
                          {metaMaterialIssueSocial.map((item, i) => (
                            <option value={item.id} key={i}>
                              {item.attributes.id_name}
                            </option>
                          ))}
                        </optgroup>
                      </Input>
                      <p className="text-danger m-0">{errors.materialIssuesList && touched.materialIssuesList && errors.materialIssuesList}</p>
                    </FormGroup>
                  </Col>
                </Row>
                {getMaterialChildLevel
                  ? (
                    <Row>
                      <Col className="additional-child-filters d-flex flex-wrap align-items-center">
                        {getMaterialChildLevel?.length > 0
                          ? (
                            <FormGroup className="me-3 mt-1 mb-2">
                              <Label>
                                <Input
                                  type="radio"
                                  name="materialIssuesChild"
                                  onChange={(e) => { setFieldValue('materialIssuesChild', [e.target.value]); }}
                                  onBlur={handleBlur}
                                  value="all"
                                  defaultChecked={saveStaticFilter?.materialIssuesChild?.length > 0 ? saveStaticFilter?.materialIssuesChild[0] === 'all' : false}
                                />
                                <span>All</span>
                              </Label>
                            </FormGroup>
                          )
                          : null}
                        {getMaterialChildLevel.map((items, i) => (
                          <FormGroup className="me-3 mt-1 mb-2" key={i}>
                            <Label>
                              <Input
                                type="radio"
                                name="materialIssuesChild"
                                onChange={(e) => { setFieldValue('materialIssuesChild', [e.target.value]); }}
                                onBlur={handleBlur}
                                value={items?.attributes?.data_key ? items?.attributes?.data_key : null}
                                defaultChecked={saveStaticFilter?.materialIssuesChild?.length > 0 ? saveStaticFilter?.materialIssuesChild[0] === items?.attributes?.data_key : false}
                              />
                              <span>{items?.attributes?.data_value}</span>
                            </Label>
                          </FormGroup>
                        ))}
                      </Col>
                      <p className="text-danger m-0 d-block">{errors.materialIssuesChild && touched.materialIssuesChild && errors.materialIssuesChild}</p>
                    </Row>
                  )
                  : null}
                <hr className="mt-2" />
                <Col sm={12}>
                  <Button type="submit" className="custom_cta px-3 btn btn-secondary" disabled={isSubmitting}>Apply Filter Data</Button>
                </Col>
              </Form>
            )}
          </Formik>
        </Col>
      </Col>

      <Col>
        {getDashboardAllData
          ? (
            <>
              <Row>
                {allData.map((item, i) => (
                  <ChartAndTable
                    data={getDashboardAllData}
                    duration={getProjectPhasesDuration}
                    itemVal={item}
                    index={i}
                    key={i}
                    filterData={saveStaticFilter}
                  />
                ))}
              </Row>
            </>
          )
          : (
            <>
              <Col className="p-4 no-data-available d-flex flex-wrap align-content-center justify-content-center">
                <Col sm={12}><NoDataImage /></Col>
                <h2>No Data Available</h2>
                <Col sm={12}><p>Seems like you do not have any data with respective filters. Please apply some different filter and try again</p></Col>
              </Col>
            </>
          )}
      </Col>

    </Col>
  );
};

export default ReportDashboard;
