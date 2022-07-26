/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { Formik } from 'formik';
import { EditUserImage } from '../../Components/common';
import {
  getUserProfile, getCountries, getIndustries, updateUserProfile,
} from '../Register/redux/action';
import { sendNotification, getUserId } from '../../Utils/globalFunctions';

const Profile = () => {
  const dispatch = useDispatch();
  const initialValues = {
    first_name: '',
    last_name: '',
    company_name: '',
    email_id: '',
    phone_number: '',
    job_title: '',
    website: '',
    business_sector_id: '',
    geo_country_id: '',
    full_name: null,
  };

  const [isActive, setActive] = useState('false');
  const [initial, setInitials] = useState(initialValues);
  const [imageName, setImageName] = useState('');
  const handleToggle = () => {
    setActive(!isActive);
  };
  const [userId, setUserId] = useState('');

  const {
    countries,
    industries,
    getUserProfiledata,
  } = useSelector((state) => state.registerReducer);

  useEffect(() => {
    if (getUserProfiledata) {
      const newInitial = {
        ...getUserProfiledata.attributes,
        business_sector_id: getUserProfiledata?.references?.business_sector.id ? getUserProfiledata?.references?.business_sector.id : '',
        geo_country_id: getUserProfiledata?.references?.geo_country.id ? getUserProfiledata?.references?.geo_country.id : '',
      };
      setImageName(`${newInitial?.first_name?.charAt(0) || ''}${newInitial?.last_name?.charAt(0) || ''}`);
      setInitials(newInitial);
    }
  }, [getUserProfiledata, setImageName, setInitials]);

  useEffect(() => {
    const initialLoad = () => {
      const tempId = getUserId();
      setUserId(tempId);
      dispatch(getUserProfile(tempId));
      dispatch(getCountries());
      dispatch(getIndustries());
    };

    initialLoad();
  }, [dispatch, setUserId]);

  return (
    <>

      <Col className="LoginPage d-flex pt-4 pb-2 h-auto profile-non-edit" id={isActive ? null : 'profileEdit'}>
        <Container>
          <Col sm="12" md={{ size: 6, offset: 3 }} className="shadow bg-white rounded overflow-hidden">
            <Col className="faq-main-title">Profile</Col>
            <Col className="p-4">

              <Formik
                enableReinitialize
                initialValues={initial}
                validate={(values) => {
                  const errors = {};
                  if (!values.first_name) {
                    errors.first_name = 'First Name is Required';
                  }
                  if (!values.last_name) {
                    errors.last_name = 'Last Name is Required';
                  }
                  if (!values.company_name) {
                    errors.company_name = 'Company Name is Required';
                  }
                  if (!values.email_id) {
                    errors.email_id = 'Email is Required';
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_id)) errors.email_id = 'Invalid email address';

                  if (!values.phone_number) {
                    errors.phone_number = 'Phone Number is Required';
                  } else if (!/[+-]?\d+(?:[.,]\d+)?$/i.test(values.phone_number)) {
                    errors.phone_number = 'Invalid Phone Number';
                  }

                  if (!values.job_title) {
                    errors.job_title = 'Job Title is Required';
                  }
                  if (!values.business_sector_id) {
                    errors.business_sector_id = 'Sector is Required';
                  }
                  if (!values.geo_country_id) {
                    errors.geo_country_id = 'Country is Required';
                  }

                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  const allValues = (({
                    // eslint-disable-next-line camelcase
                    email_id, created_timestamp, status_id, ...o
                  }) => o)(values);
                  dispatch(updateUserProfile({
                    data: {
                      ...allValues,
                      phone_number: allValues.phone_number.toString(8),
                      business_sector_id: parseInt(allValues.business_sector_id, 10),
                      geo_country_id: parseInt(allValues.geo_country_id, 10),
                      full_name: `${allValues.first_name} ${allValues.last_name}`,
                    },
                    userId,
                  })).then((data) => {
                    if (data) {
                      sendNotification('success', 'Profile Update Successfully', 1000, 'center-top');
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
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup className="mt-1 mb-5">
                      <div className="profile-image d-flex justify-content-center">
                        <Input
                          type="file"
                          name="profileimg"
                          id="Profileimg"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.profileimg}
                        />
                        <Col className="image">{imageName}</Col>
                        <Col className="edit-icon" onClick={handleToggle}><EditUserImage /></Col>
                      </div>
                    </FormGroup>
                    <Row>
                      <Col sm={6}>
                        <FormGroup>
                          <Label>First Name</Label>
                          <Input
                            type="text"
                            name="first_name"
                            id="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                          />
                          <p className="text-danger m-0">{errors.first_name && touched.first_name && errors.first_name}</p>
                        </FormGroup>
                      </Col>
                      <Col sm={6}>
                        <FormGroup>
                          <Label>Last Name</Label>
                          <Input
                            type="text"
                            name="last_name"
                            id="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last_name}
                          />
                          <p className="text-danger m-0">{errors.last_name && touched.last_name && errors.last_name}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup className="mt-3">
                      <Label>Company Name</Label>
                      <Input
                        type="text"
                        name="company_name"
                        id="CompName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.company_name}
                      />
                      <p className="text-danger m-0">{errors.company_name && touched.company_name && errors.company_name}</p>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email_id"
                        id="EmailId"
                        disabled="disabled"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email_id}
                      />
                      <p className="text-danger m-0">{errors.email_id && touched.email_id && errors.email_id}</p>
                    </FormGroup>
                    <FormGroup className="mt-3">
                      <Label>Website</Label>
                      <Input
                        type="text"
                        name="website"
                        id="Website"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.website}
                      />
                    </FormGroup>
                    <Row>
                      <Col sm="6">
                        <FormGroup className="mt-3">
                          <Label>Phone Number</Label>
                          <Input
                            type="text"
                            name="phone_number"
                            id="PhoneNumber"
                            pattern="[+-]?\d+(?:[.,]\d+)?"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone_number}
                          />
                          <p className="text-danger m-0">{errors.phone_number && touched.phone_number && errors.phone_number}</p>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup className="mt-3">
                          <Label>Job Title</Label>
                          <Input
                            type="text"
                            name="job_title"
                            id="JobTitle"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.job_title}
                          />
                          <p className="text-danger m-0">{errors.job_title && touched.job_title && errors.job_title}</p>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup className="mt-3">
                          <Label>Type of Sector</Label>
                          <Input
                            type="select"
                            name="business_sector_id"
                            id="Sector"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.business_sector_id}
                          >
                            <option value="0" disabled="disabled" defaultValue>Select Sector</option>
                            {industries.map((item) => (
                              <option value={item.id} key={item.id}>
                                {item.attributes.id_name}
                              </option>
                            ))}
                          </Input>
                          <p className="text-danger m-0">{errors.business_sector_id && touched.business_sector_id && errors.business_sector_id}</p>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup className="mt-3">
                          <Label>Country</Label>
                          <Input
                            type="select"
                            name="geo_country_id"
                            id="Country"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.geo_country_id}
                          >
                            <option value="0" disabled="disabled" defaultValue>Select Country</option>
                            {countries.map((item) => (
                              <option value={item.id} key={item.id}>
                                {item.attributes.id_name}
                              </option>
                            ))}
                          </Input>
                          <p className="text-danger m-0">{errors.geo_country_id && touched.geo_country_id && errors.geo_country_id}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Col className="right_side_button d-flex justify-content-end"><Button type="submit" className="w-100 custom_cta mt-4" disabled={isSubmitting}>Save</Button></Col>
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

export default Profile;
