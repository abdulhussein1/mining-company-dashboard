import {
  DASHBOARD_GET_DATA,
  MATERIAL_ISSUE_CATEGORY,
  MATERIAL_ISSUE_CHILD,
  META_MATERIAL_ISSUE_ECONOMICS,
  META_MATERIAL_ISSUE_ENVIRONMENT,
  META_MATERIAL_ISSUE_GOVERNANCE,
  META_MATERIAL_ISSUE_SOCIAL,
  STATIC_FILTER,
} from './constant';

import {
  META_MATERIAL_ISSUES_CATEGORIES,
  META_MATERIAL_ISSUES,
  DASHBOARD_DATA,
  META_MATERIAL_ISSUE_CHILD_LEVEL,
} from '../../Utils/apiList';
import Api from '../../Utils/api';
import { sendNotification } from '../../Utils/globalFunctions';
// import { errorsHandler } from '../../../Utils/globalFunctions';

// Fetching categories
export const getMetaMaterialIssueCategory = () => (dispatch) => Api.get(META_MATERIAL_ISSUES_CATEGORIES, { action: 'filter', format: 'dereference' }).then(
  (res) => {
    dispatch({
      type: MATERIAL_ISSUE_CATEGORY,
      payload: res.data.resource_list,
    });
  },
  (err) => err,
);

// Fetching material issues economics
export const getMetaMaterialIssueEconomics = () => (dispatch) => Api.get(META_MATERIAL_ISSUES, { action: 'filter', 'filter-keys': 'material_issue_category', 'filter-values': 'economics' }).then(
  (res) => {
    dispatch({
      type: META_MATERIAL_ISSUE_ECONOMICS,
      payload: res.data.resource_list,
    });
  },
  (err) => err,
);

// Fetching material issues environment
export const getMetaMaterialIssueEnvironment = () => (dispatch) => Api.get(META_MATERIAL_ISSUES, { action: 'filter', 'filter-keys': 'material_issue_category', 'filter-values': 'environment' }).then(
  (res) => {
    dispatch({
      type: META_MATERIAL_ISSUE_ENVIRONMENT,
      payload: res.data.resource_list,
    });
  },
  (err) => err,
);

// Fetching material issues governance
export const getMetaMaterialIssueGovernance = () => (dispatch) => Api.get(META_MATERIAL_ISSUES, { action: 'filter', 'filter-keys': 'material_issue_category', 'filter-values': 'governance' }).then(
  (res) => {
    dispatch({
      type: META_MATERIAL_ISSUE_GOVERNANCE,
      payload: res.data.resource_list,
    });
  },
  (err) => err,
);

// Fetching material issues social
export const getMetaMaterialIssueSocial = () => (dispatch) => Api.get(META_MATERIAL_ISSUES, { action: 'filter', 'filter-keys': 'material_issue_category', 'filter-values': 'social' }).then(
  (res) => {
    dispatch({
      type: META_MATERIAL_ISSUE_SOCIAL,
      payload: res.data.resource_list,
    });
  },
  (err) => err,
);

// Material issue category levels
export const getMaterialIssueChild = (materialIssueId) => (dispatch) => Api.get(META_MATERIAL_ISSUE_CHILD_LEVEL, { action: 'filter', 'filter-keys': 'material_issue_id', 'filter-values': materialIssueId }).then((res) => {
  dispatch({ type: MATERIAL_ISSUE_CHILD, payload: res.data.resource_list });
}, () => {
  dispatch({ type: MATERIAL_ISSUE_CHILD, payload: false });
});

// Fetching dashboard chart data
export const getDashboardData = (data) => (dispatch) => Api.get(DASHBOARD_DATA, data).then(
  (res) => {
    dispatch({ type: DASHBOARD_GET_DATA, payload: res.data.resource_list });
    sendNotification('success', 'Filter Updated Successfully', 2000, 'top-center');
  }, () => {
    dispatch({ type: DASHBOARD_GET_DATA, payload: false });
    sendNotification('error', 'No Data Available', 2000, 'top-center');
  },
);
// set dashboard blank chart data
export const setDashboardBlankData = (data) => (dispatch) => Api.get(DASHBOARD_DATA, data).then(
  (res) => {
    dispatch({ type: DASHBOARD_GET_DATA, payload: res.data.resource_list });
  }, () => {
    dispatch({ type: DASHBOARD_GET_DATA, payload: false });
  },
);

// Save static filter data
export const saveFilterValues = (values) => (dispatch) => (
  dispatch({ type: STATIC_FILTER, payload: values })
);
