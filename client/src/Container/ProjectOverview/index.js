/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Col, Button, Form, FormGroup, Label, Input, Row, UncontrolledTooltip,
} from 'reactstrap';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { getCountries, getIndustries } from '../Register/redux/action';
import {
  getMiningType, getMiningStatus, getSubIndustry, projectNameCheck, updateProjectDetails,
  getProjectSector,
} from '../Dashboard/redux/action';
import { EditUserImage, LoadingCheck, LoadingIconImage } from '../../Components/common';
import { getUserId, sendNotification } from '../../Utils/globalFunctions';

const ProjectOverviewPage = () => {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState('false');
  const handleToggle = () => {
    setActive(!isActive);
  };

  const initialValues = useMemo(() => ({
    name: '',
    location: '',
    natureowner: '',
    geo_country_id: '',
    state: '',
    pincode: '',
    area_hectares: '',
    sectortype: '',
    business_industry_id: '',
    miningtype: '',
    mineStatus: '',
    marketserved: '',
    loc_lat: null,
    loc_long: null,
  }), []);

  const {
    countries,
    industries,
  } = useSelector((state) => state.registerReducer);
  const {
    minetype,
    minestatus,
    subindustry,
    projectNameVerify,
    projectDetailData,
    getProjectSectorData,
  } = useSelector((state) => state.dashboardReducer);
  const projectId = projectDetailData.id;

  // Get location
  const [showLocation, setShowLocation] = useState(false);
  const {
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: 'AIzaSyD8Aphh9TfxhOqU6-RzeMWt0l8oIzVa8MU',
  });

  // set project details on form
  const [initial, setInitials] = useState(initialValues);
  useEffect(() => {
    if (projectDetailData) {
      const getIndustryId = projectDetailData?.references?.business_industry?.id;
      dispatch(getProjectSector(getIndustryId));

      const newInitial = {
        ...initialValues,
        ...projectDetailData.attributes,
        geo_country_id: projectDetailData?.references?.geo_country?.id ? projectDetailData?.references?.geo_country?.id : '',
        business_industry_id: projectDetailData?.references?.business_industry?.id ? projectDetailData?.references?.business_industry?.id : '',
        sectortype: getProjectSectorData?.references?.business_sector?.id ? getProjectSectorData?.references?.business_sector?.id : '',
      };
      setInitials(newInitial);
    }
    // eslint-disable-next-line
  }, [projectDetailData, setInitials, initialValues]);

  const getSubIndustryByIndustry = (sectorType) => {
    dispatch(getSubIndustry(sectorType));
  };

  useEffect(() => {
    getSubIndustryByIndustry(getProjectSectorData?.references?.business_sector?.id);
    const newInitial = {
      ...initialValues,
      ...projectDetailData.attributes,
      geo_country_id: projectDetailData?.references?.geo_country?.id ? projectDetailData?.references?.geo_country?.id : '',
      sectortype: getProjectSectorData?.references?.business_sector?.id ? getProjectSectorData?.references?.business_sector?.id : '',
      business_industry_id: projectDetailData?.references?.business_industry?.id ? projectDetailData?.references?.business_industry?.id : '',
    };
    // eslint-disable-next-line
    setInitials(newInitial);
    // eslint-disable-next-line
  }, [getProjectSectorData]);

  // useEffect(() => {
  // }, [projectDetailData?.references?.business_industry?.id]);

  useEffect(() => {
    const initialLoad = () => {
      dispatch(getCountries());
      dispatch(getIndustries());
      dispatch(getMiningType());
      dispatch(getMiningStatus());
    };

    initialLoad();
  }, [dispatch, projectId]);

  return (
    <>
      <Col className="LoginPage d-flex pt-5 pb-5 h-auto profile-non-edit" id={isActive ? null : 'profileEdit'}>
        <Col sm="8" className="shadow bg-white rounded overflow-hidden offset-md-2">
          <Col className="faq-main-title position-relative">
            Project Overview
            <Col className="edit-icon project_edit" onClick={handleToggle}><EditUserImage /></Col>
          </Col>
          <Col className="p-4">

            <Formik
              enableReinitialize
              initialValues={initial}
              validate={(values) => {
                const errors = {};
                const tempId = getUserId();
                if (values.name !== projectDetailData.attributes.name) {
                  dispatch(projectNameCheck({ tempId, name: values.name }));
                }
                if (!values.name) {
                  errors.name = 'Project name is Required';
                } else if (projectNameVerify.status === true) errors.name = 'Project name already exists';

                if (!values.location) {
                  errors.location = 'Location is Required';
                }
                if (!values.geo_country_id) {
                  errors.geo_country_id = 'Country is Required';
                }
                if (!values.business_industry_id) {
                  errors.business_industry_id = 'Industry is Required';
                }
                if (!values.sectortype) {
                  errors.sectortype = 'Sector Type is Required';
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const allValues = (({
                  mineStatus, miningtype, sectortype, natureowner, state,
                  pincode, marketserved, status_id, business_industry_id,
                  ...o
                }) => o)(values);
                dispatch(updateProjectDetails({
                  data: {
                    ...allValues,
                    // business_industry_id: parseInt(allValues.business_industry_id, 10),
                    geo_country_id: parseInt(allValues.geo_country_id, 10),
                    area_hectares: allValues.area_hectares || null,
                  },
                  projectId,
                })).then((data) => {
                  if (data) {
                    sendNotification('success', 'Project Update Successfully', 1000, 'center-top');
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
                setFieldValue,
                isSubmitting,
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
                            disabled
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
                            disabled
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
                    <Col className="right_side_button d-flex justify-content-end">
                      <Button type="submit" className="w-100 custom_cta mt-3" disabled={isSubmitting}>Save</Button>
                    </Col>
                  </Col>
                </Form>
              )}
            </Formik>

          </Col>
        </Col>
      </Col>
    </>
  );
};

export default ProjectOverviewPage;
