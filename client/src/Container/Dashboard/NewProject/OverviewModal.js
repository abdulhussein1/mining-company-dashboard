/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, FormGroup, Label, Input, Col, Row, UncontrolledTooltip,
} from 'reactstrap';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { getCountries, getIndustries } from '../../Register/redux/action';
import {
  getMiningType, getMiningStatus, getSubIndustry, projectNameCheck,
} from '../redux/action';
import { LoadingCheck, LoadingIconImage } from '../../../Components/common';
import { getUserId } from '../../../Utils/globalFunctions';
// import OverviewTable from './OverviewTable';

const Overview = ({ submit, initial }) => {
  const dispatch = useDispatch();
  const {
    countries,
    industries,
  } = useSelector((state) => state.registerReducer);
  const {
    minetype,
    minestatus,
    subindustry,
    projectNameVerify,
    createNewProject,
  } = useSelector((state) => state.dashboardReducer);

  // Get location
  const [showLocation, setShowLocation] = useState(false);
  const {
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: 'AIzaSyD8Aphh9TfxhOqU6-RzeMWt0l8oIzVa8MU',
  });

  useEffect(() => {
    const initialLoad = () => {
      dispatch(getCountries());
      dispatch(getIndustries());
      dispatch(getMiningType());
      dispatch(getMiningStatus());
    };
    initialLoad();
  }, [dispatch]);

  const getSubIndustryByIndustry = (sectorType) => {
    dispatch(getSubIndustry(sectorType));
  };

  const overviewSchema = yup.object().shape({
    name: yup.string().required('Project name is Required').test('project-name-check', 'Project name already exists',
      (value) => new Promise((resolve) => {
        const tempId = getUserId();
        dispatch(projectNameCheck({ tempId, name: value })).then((data) => {
          if (!data) {
            resolve(true);
          } else if (createNewProject?.name === value) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      })),
    location: yup.string().required('Location is Required'),
    geo_country_id: yup.string().required('Country is Required'),
    business_industry_id: yup.string().required('Industry is Required'),
    sectortype: yup.string().required('Sector Type is Required'),
  });

  return (
    <Formik
      initialValues={initial}
      validationSchema={overviewSchema}
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
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Col className="p-2">
            <FormGroup className="position-relative loading project_name">
              <Label>Name of project</Label>
              <Input
                type="text"
                name="name"
                id="ProjectName"
                placeholder="Write name of your project"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {!errors.name && touched.name && projectNameVerify.loading === false && projectNameVerify.status === false ? <div className="loading_image verify"><LoadingCheck /></div> : '' }
              {touched.name && projectNameVerify.loading ? <div className="loading_image"><LoadingIconImage /></div> : ''}
              <p className="text-danger m-0">{errors.name && touched.name && errors.name}</p>
            </FormGroup>
            <FormGroup className="mt-3 position-relative">
              <Label>Location</Label>
              <Input
                type="text"
                id="location"
                value={values.location}
                onChange={(evt) => {
                  setShowLocation(true);
                  setFieldValue('location', evt.target.value);
                  getPlacePredictions({ input: evt.target.value });
                }}
                loading={isPlacePredictionsLoading}
              />
              <ul className={showLocation ? 'location_area' : 'd-none'}>
                {placePredictions.map((item, i) => (
                  <li key={i}>
                    <Button onClick={() => { setFieldValue('location', item.description); setShowLocation(false); }}>
                      {item.description}
                    </Button>
                  </li>
                ))}
              </ul>
              <p className="text-danger m-0">{errors.location && touched.location && errors.location}</p>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label>Nature of ownership and legal form</Label>
              <Input
                type="textarea"
                name="natureowner"
                id="NatureOwner"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.natureowner}
              />
              <p className="text-danger m-0">{errors.natureowner && touched.natureowner && errors.natureowner}</p>
            </FormGroup>
            <Row>
              <Col sm={6} className="mt-3">
                <FormGroup>
                  <Label>Country</Label>
                  <Input
                    type="select"
                    name="geo_country_id"
                    id="Country"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.geo_country_id}
                  >
                    <option value="" disabled="disabled" defaultValue>Select Country</option>
                    {countries.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.attributes.id_name}
                      </option>
                    ))}
                  </Input>
                  <p className="text-danger m-0">{errors.geo_country_id && touched.geo_country_id && errors.geo_country_id}</p>
                </FormGroup>
              </Col>
              <Col sm={6} className="mt-3">
                <FormGroup>
                  <Label>State</Label>
                  <Input
                    type="select"
                    name="state"
                    id="State"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                  >
                    <option value="" disabled="disabled" defaultValue>Select State</option>
                    <option value="1">State 1</option>
                    <option value="2">State 2</option>
                    <option value="3">State 3</option>
                  </Input>
                  <p className="text-danger m-0">{errors.state && touched.state && errors.state}</p>
                </FormGroup>
              </Col>
              <Col sm={6} className="mt-3">
                <FormGroup>
                  <Label>Pin Code</Label>
                  <Input
                    type="text"
                    name="pincode"
                    id="PinCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pincode}
                  />
                  <p className="text-danger m-0">{errors.pincode && touched.pincode && errors.pincode}</p>
                </FormGroup>
              </Col>
              <Col sm={6} className="mt-3">
                <FormGroup>
                  <Label>Project Area, Hecters</Label>
                  <Input
                    type="text"
                    name="area_hectares"
                    id="ProjectArea"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.area_hectares}
                  />
                  <p className="text-danger m-0">{errors.area_hectares && touched.area_hectares && errors.area_hectares}</p>
                </FormGroup>
              </Col>
              <Col sm={6} className="mt-3">
                <FormGroup>
                  <Label>Type of Sector</Label>
                  <Input
                    type="select"
                    name="sectortype"
                    id="SectorType"
                    onChange={(e) => {
                      handleChange(e);
                      getSubIndustryByIndustry(e.target.value);
                    }}
                    onBlur={handleBlur}
                    value={values.sectortype}
                  >
                    <option value="" disabled="disabled" defaultValue>Select Sector</option>
                    {industries.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.attributes.id_name}
                      </option>
                    ))}
                  </Input>
                  <p className="text-danger m-0">
                    {errors.sectortype && touched.sectortype && errors.sectortype}
                  </p>
                </FormGroup>
              </Col>
              <Col sm={6} className="mt-3">
                <FormGroup>
                  <Label>
                    Type of Industry
                    <span className="ms-2" id="indus">&#9432;</span>
                  </Label>
                  <UncontrolledTooltip placement="top" target="indus">
                    Demo data
                  </UncontrolledTooltip>
                  <Input
                    type="select"
                    name="business_industry_id"
                    id="Industry"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.business_industry_id}
                  >
                    <option value="" disabled="disabled" defaultValue>Select Industry</option>
                    {values.sectortype && subindustry.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.attributes.id_name}
                      </option>
                    ))}
                  </Input>
                  <p className="text-danger m-0">{errors.business_industry_id && touched.business_industry_id && errors.business_industry_id}</p>
                </FormGroup>
              </Col>
              <Col sm={6} className="mt-3">
                <FormGroup>
                  <Label>Mine type</Label>
                  <Input
                    type="select"
                    name="miningtype"
                    id="MiningType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.miningtype}
                  >
                    <option value="" disabled="disabled" defaultValue>Select Mine Type</option>
                    {minetype.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.attributes.id_name}
                      </option>
                    ))}
                  </Input>
                  <p className="text-danger m-0">{errors.miningtype && touched.miningtype && errors.miningtype}</p>
                </FormGroup>
              </Col>
              <Col sm={6} className="mt-3">
                <FormGroup>
                  <Label>Mine Status</Label>
                  <Input
                    type="select"
                    name="mineStatus"
                    id="MineStatus"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mineStatus}
                  >
                    <option value="" disabled="disabled" defaultValue>Select Mine Status</option>
                    {minestatus.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.attributes.id_name}
                      </option>
                    ))}
                  </Input>
                  <p className="text-danger m-0">{errors.mineStatus && touched.mineStatus && errors.mineStatus}</p>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className="mt-3">
              <Label>Market Served</Label>
              <Input
                type="textarea"
                name="marketserved"
                id="MarketServed"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.marketserved}
              />
              <p className="text-danger m-0">{errors.marketserved && touched.marketserved && errors.marketserved}</p>
            </FormGroup>
            <Col className="text-center mt-3"><Button type="submit" className="custom_cta px-4">Next</Button></Col>
          </Col>
        </Form>
      )}
    </Formik>
  );
};

Overview.propTypes = {
  submit: PropTypes.func,
  initial: PropTypes.objectOf(PropTypes.any).isRequired,
};
Overview.defaultProps = {
  submit: (() => {}),
};

export default Overview;
