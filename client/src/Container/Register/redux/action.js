import {
  COUNTRY_LIST,
  EMAIL_VERIFICATION_ERROR,
  EMAIL_VERIFICATION_START,
  EMAIL_VERIFICATION_SUCCESS,
  INDUSTRY_LIST,
  SET_USER_TOKEN,
  USER_REGISTER,
  RESEND_EMAIL_VERIFICATION_START,
  RESEND_EMAIL_VERIFICATION_SUCCESS,
  RESEND_EMAIL_VERIFICATION_ERROR,
  EMAIL_CHECK_START,
  EMAIL_CHECK_SUCCESS,
  EMAIL_CHECK_ERROR,
  FORGOT_PASSWORD,
  RESEND_FORGOT_PASSWORD_START,
  RESEND_FORGOT_PASSWORD_SUCCESS,
  RESEND_FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_TOKEN, ADD_NEW_PASSWORD,
  USER_PROFILE, UPDATE_USER_PROFILE, CHANGE_PASSWORD, CREATE_PROJECT_MEMEBER,
} from './constant';
import {
  META_GEO_COUNTRIES,
  META_BUSINESS_SECTOR,
  USERS,
  APP_USER_SESSION,
  APP_USER_LOGIN_CREDENTIAL_VERIFY,
  PROJECT_MEMBERS,
} from '../../../Utils/apiList';
import Api from '../../../Utils/api';
import { errorsHandler } from '../../../Utils/globalFunctions';

// Fetching countries list
export const getCountries = () => (dispatch) => Api.get(META_GEO_COUNTRIES, { action: 'filter', format: 'dereference' }).then(
  (res) => {
    dispatch({ type: COUNTRY_LIST, payload: res.data.resource_list });
  },
  (err) => err,
);

// Fetching industries list
export const getIndustries = () => (dispatch) => Api.get(META_BUSINESS_SECTOR, { action: 'filter', format: 'dereference' }).then(
  (res) => {
    dispatch({ type: INDUSTRY_LIST, payload: res.data.resource_list });
  },
  (err) => err,
);

// User Registration
export const registerUser = (values) => (dispatch) => Api.post(USERS, values).then(() => {
  dispatch({ type: USER_REGISTER, payload: values });
  return true;
},
(err) => {
  errorsHandler(err);
  return false;
});

// Email Verification
export const emailVerification = (key, id) => (dispatch) => {
  dispatch({ type: EMAIL_VERIFICATION_START });
  const params = {
    newUserActivation: 1,
    token: key,
  };
  return Api.get(USERS, id, params).then(() => {
    dispatch({ type: EMAIL_VERIFICATION_SUCCESS });
  }, (err) => {
    dispatch({ type: EMAIL_VERIFICATION_ERROR });
    errorsHandler(err);
  });
};

// Resend Email Verification
export const resendEmailForVerification = (values) => (dispatch) => {
  dispatch({ type: RESEND_EMAIL_VERIFICATION_START });
  Api.get(APP_USER_LOGIN_CREDENTIAL_VERIFY, { action: 'reverify', 'credential-id': values }).then(() => {
    dispatch({ type: RESEND_EMAIL_VERIFICATION_SUCCESS });
  }, (err) => {
    dispatch({ type: RESEND_EMAIL_VERIFICATION_ERROR });
    errorsHandler(err);
  });
};

// User Login
export const userLogin = (values) => (dispatch) => (
  Api.post(APP_USER_SESSION, values).then((res) => {
    dispatch({ type: SET_USER_TOKEN, payload: res.data.resource.attributes.access_token });
    return true;
  }, (err) => {
    errorsHandler(err);
    return false;
  })
);

// User Email Check
export const userEmailCheck = (values) => (dispatch) => {
  dispatch({ type: EMAIL_CHECK_START });
  Api.get(USERS, { action: 'filter', 'filter-keys': 'email_id', 'filter-values': values.email }).then(() => {
    dispatch({ type: EMAIL_CHECK_SUCCESS, payload: false });
  }, () => dispatch({ type: EMAIL_CHECK_ERROR, payload: false }));
};

// Forgot user Password
export const forgotUserPassword = (values) => (dispatch) => (
  Api.post(APP_USER_SESSION, values).then(() => {
    dispatch({ type: FORGOT_PASSWORD, payload: values });
    return true;
  }, (err) => errorsHandler(err))
);

// Resend Forgot Email
export const resendEmailForgotPassword = (values) => (dispatch) => {
  dispatch({ type: RESEND_FORGOT_PASSWORD_START });
  Api.post(APP_USER_SESSION, values).then(() => {
    dispatch({ type: RESEND_FORGOT_PASSWORD_SUCCESS });
  }, (err) => {
    dispatch({ type: RESEND_FORGOT_PASSWORD_ERROR });
    errorsHandler(err);
  });
};

// Login forgot token
export const autoLoginToken = (values) => (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_TOKEN, payload: values });
};

// Add New Password
export const updateNewPassword = ({ data, token, forgotTokenValue }) => (dispatch) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return Api.put(`${USERS}/${forgotTokenValue}`, data, headers).then(() => {
    dispatch({ type: ADD_NEW_PASSWORD, payload: data });
    return true;
  }, (err) => { errorsHandler(err); return false; });
};

// Get user profile
export const getUserProfile = (userId) => (dispatch) => {
  Api.get(`${USERS}/${userId}`, {}).then((res) => {
    dispatch({ type: USER_PROFILE, payload: res.data.resource });
  }, (err) => errorsHandler(err));
};

// Update user profile
export const updateUserProfile = ({ data, userId }) => (dispatch) => Api.put(`${USERS}/${userId}`, data).then(() => {
  dispatch({ type: UPDATE_USER_PROFILE, payload: data });
  return true;
}, (err) => { errorsHandler(err); return false; });

// Change Password
export const changePassword = ({ data, userId }) => (dispatch) => Api.put(`${USERS}/${userId}`, data).then(() => {
  dispatch({ type: CHANGE_PASSWORD, payload: data });
  return true;
}, (err) => { errorsHandler(err); return false; });

// User Logout
export const logoutUser = () => (dispatch) => {
  dispatch({ type: 'USER_LOGOUT', payload: null });
};

// create project member
export const createProjectMember = (values) => (dispatch) => (
  Api.post(PROJECT_MEMBERS, values).then(() => {
    dispatch({ type: CREATE_PROJECT_MEMEBER, payload: values });
    return true;
  }, (err) => errorsHandler(err))
);
