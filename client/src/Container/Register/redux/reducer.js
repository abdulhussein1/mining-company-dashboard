import {
  COUNTRY_LIST, EMAIL_VERIFICATION_ERROR, EMAIL_VERIFICATION_START,
  EMAIL_VERIFICATION_SUCCESS, INDUSTRY_LIST, SET_USER_TOKEN, USER_REGISTER,
  RESEND_EMAIL_VERIFICATION_START, RESEND_EMAIL_VERIFICATION_ERROR,
  RESEND_EMAIL_VERIFICATION_SUCCESS, EMAIL_CHECK_START, EMAIL_CHECK_SUCCESS,
  EMAIL_CHECK_ERROR, FORGOT_PASSWORD, RESEND_FORGOT_PASSWORD_START,
  RESEND_FORGOT_PASSWORD_SUCCESS, RESEND_FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_TOKEN,
  ADD_NEW_PASSWORD,
  USER_PROFILE,
  UPDATE_USER_PROFILE,
  CHANGE_PASSWORD,
  CREATE_PROJECT_MEMEBER,
} from './constant';

const INITIAL_STATE = {
  countries: [],
  industries: [],
  getUserProfiledata: [],
  registerStatus: false,
  forgotPassword: false,
  emailVerificationLoading: false,
  emailVerification: false,
  resendEmailForVerification: '',
  resendEmailForgot: '',
  userToken: null,
  newPasswordUpdate: null,
  userEmailVerification: {
    loading: false,
    status: false,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUNTRY_LIST:
      return {
        ...state, countries: action.payload,
      };
    case INDUSTRY_LIST:
      return {
        ...state, industries: action.payload,
      };
    case USER_REGISTER:
      return {
        ...state, registerStatus: true, resendEmailForVerification: action.payload.email_id,
      };
    case EMAIL_VERIFICATION_START:
      return {
        ...state, emailVerificationLoading: true, emailVerification: false,
      };
    case EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state, emailVerificationLoading: false, emailVerification: true,
      };
    case EMAIL_VERIFICATION_ERROR:
      return {
        ...state, emailVerificationLoading: false, emailVerification: false,
      };

    case RESEND_EMAIL_VERIFICATION_START:
      return {
        ...state, emailVerificationLoading: true,
      };
    case RESEND_EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state, emailVerificationLoading: false,
      };
    case RESEND_EMAIL_VERIFICATION_ERROR:
      return {
        ...state, emailVerificationLoading: false,
      };

    case SET_USER_TOKEN:
      return {
        ...state, userToken: action.payload,
      };
    case EMAIL_CHECK_START:
      return {
        ...state,
        userEmailVerification: {
          loading: true,
          status: false,
        },
      };
    case EMAIL_CHECK_SUCCESS:
      return {
        ...state,
        userEmailVerification: {
          loading: false,
          status: true,
        },
      };
    case EMAIL_CHECK_ERROR:
      return {
        ...state,
        userEmailVerification: {
          loading: false,
          status: false,
        },
      };
    case FORGOT_PASSWORD:
      return {
        ...state, forgotPassword: true, resendEmailForgotPassword: action.payload.login_name,
      };
    case RESEND_FORGOT_PASSWORD_START:
      return {
        ...state, emailVerificationLoading: true,
      };
    case RESEND_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state, emailVerificationLoading: false,
      };
    case RESEND_FORGOT_PASSWORD_ERROR:
      return {
        ...state, emailVerificationLoading: false,
      };

    case FORGOT_PASSWORD_TOKEN:
      return {
        ...state, autoLoginToken: action.payload,
      };
    case ADD_NEW_PASSWORD:
      return {
        ...state,
      };
    case USER_PROFILE:
      return {
        ...state, getUserProfiledata: action.payload,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
      };
    case CREATE_PROJECT_MEMEBER:
      return {
        ...state, projectMember: action.payload,
      };
    default: return state;
  }
};

export default reducer;
