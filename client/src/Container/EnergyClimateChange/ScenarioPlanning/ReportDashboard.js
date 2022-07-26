/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Row, Col, FormGroup, Input, Table,
} from 'reactstrap';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import ENVIRONMENT from '../../../Components/Constants/EnvironmentConstent';
import { PROJECT_MATERIAL_ISSUE_DATA_OUTPUT } from '../../../Utils/apiList';
import api from '../../../Utils/api';

const ReportDashboard = ({
  projectId, phaseIdValue, scenarioIdValue, segmentid, activeYear, showFilter,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [outputData, setOutputData] = useState(null);
  const [uniqueData, setUniqueData] = useState(null);
  const {
    scenarioList,
    projectPhasesData,
  } = useSelector((state) => state.dashboardReducer);

  const initialLoad = () => {
    const materialIssue = 2;
    api.get(PROJECT_MATERIAL_ISSUE_DATA_OUTPUT, {
      action: 'filter',
      'filter-keys': 'project_id,phase_id,scenario_id,material_issue_id,material_issue_segment_id,data_date',
      'filter-values': `${projectId},${phaseIdValue},${scenarioIdValue},${materialIssue},${segmentid},${activeYear}`,
    }).then(
      (res) => {
        const sorted = _.uniqBy(res.data.resource_list, 'attributes.description');
        setUniqueData(sorted);
        setOutputData(_.chunk(res.data.resource_list, sorted.length));
      },
      // eslint-disable-next-line no-unused-vars
      (err) => {
        setOutputData(null);
        setUniqueData(null);
      },
    );
  };

  useEffect(() => {
    initialLoad();
    // eslint-disable-next-line
  }, [phaseIdValue, activeYear]);

  const firstChart = {
    series: [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
  };

  return (
    <Col className="dashboard_area">
      {showFilter === 0 ? (
        <Col sm={12} className="filter-area mt-4">
          <Formik
            initialValues={{
              selecttypeone: '',
              selectframework: '',
              selectscenario: '',
              selectreportingyear: '',
              materialList: '',
            }}
            validate={() => {
              const errors = {};
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
              // errors,
              // touched,
              handleChange,
              handleBlur,
              handleSubmit,
            // isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="custom_blocks_width">
                  <Col sm={2} className="mb-3">
                    <FormGroup>
                      <Input
                        type="select"
                        name="selecttypeone"
                        id="SelectType"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.selecttypeone}
                        defaultValue
                      >
                        <option value="" disabled="disabled">Select Option</option>
                        <option value="sustainability_reporting">Sustainability Reporting</option>
                        <option value="compliance_reporting">Compliance Reporting</option>
                        <option value="impact_reporting">Impact Reporting</option>
                        <option value="benchmarking">Benchmarking</option>
                        <option value="scenario_comparison">Scenario Comparison</option>
                        <option value="carbon_profile">Carbon Profile</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm={2} className="mb-3">
                    <FormGroup>
                      <Input
                        type="select"
                        name="selectframework"
                        id="SelectFrame"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.selectframework}
                        defaultValue
                      >
                        <option value="" disabled="disabled">Select Option</option>
                        <option value="tos">TOS</option>
                        <option value="gri">GRI</option>
                        <option value="tcfd">TCFD</option>
                        <option value="sasb">SASB</option>
                        <option value="icmm">ICMM</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm={2} className="mb-3">
                    <FormGroup>
                      <Input
                        type="select"
                        name="selectscenario"
                        id="SelectScena"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue=""
                        value={values.selectscenario}
                      >
                        <option value="" disabled="disabled">Select Scenarios</option>
                        {scenarioList.map((item) => (
                          <option value={item.id.scenario_id} key={item.id.scenario_id}>
                            {item.attributes.scenario_name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm={2} className="mb-3">
                    <FormGroup>
                      <Input
                        type="select"
                        name="selectreportingyear"
                        id="SelectReport"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.selectreportingyear}
                        defaultValue=""
                      >
                        <option value="" disabled="disabled">Select Duration</option>
                        {projectPhasesData.map((item, i) => (
                          <option value={item.attributes.description} key={i}>
                            {item.attributes.description}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm={2} className="mb-3">
                    <FormGroup>
                      <Input
                        type="select"
                        name="materialList"
                        id="SelectReport"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.materialList}
                        defaultValue=""
                      >
                        <option value="" disabled="disabled">Select Material Issue</option>
                        {ENVIRONMENT.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.attributes.id_name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      ) : ''}

      <Row>
        <Col sm={12}>
          <Col className="shadow p-3 bg-white rounded mb-4">
            <Table striped bordered className="modalTable detailModalPart">
              {outputData
                ? (
                  <>
                    <thead>
                      <tr>
                        {uniqueData.map((items, i) => (
                          <th key={i}>
                            {items?.attributes?.description}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {outputData.map((items, i) => (
                        <tr key={i}>
                          {items.map((it, j) => (
                            <th key={j}>
                              {it?.attributes?.data_value}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </>
                )
                : (
                  <thead>
                    <tr>
                      <th>No Data Available</th>
                    </tr>
                  </thead>
                )}
            </Table>
          </Col>
        </Col>
      </Row>

      <Row>
        <Col className="shadow p-3 bg-white rounded mb-4">
          <Chart
            options={firstChart.options}
            series={firstChart.series}
            type="line"
            width="100%"
            height="400"
          />
        </Col>
      </Row>
    </Col>
  );
};

ReportDashboard.propTypes = {
  projectId: PropTypes.number,
  phaseIdValue: PropTypes.number,
  scenarioIdValue: PropTypes.number,
  segmentid: PropTypes.number,
  activeYear: PropTypes.string,
  showFilter: PropTypes.number.isRequired,
};
ReportDashboard.defaultProps = {
  projectId: null,
  phaseIdValue: null,
  scenarioIdValue: null,
  segmentid: null,
  activeYear: null,
};

export default ReportDashboard;
