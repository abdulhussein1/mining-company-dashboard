/* eslint-disable max-len */
import {
  PROJECT_PHASE_NAMES,
  PROJECT_PHASE_YEARS,
  STATIONARY_TABLE_POST_DATA,
  DELETE_TABLE_DATA,
  UPDATE_TABLE_DATA,
  GHG_CALCULATE_POST_DATA,
} from './constant';

import {
  PROJECT_PHASE_DURATIONS,
  PROJECT_MATERIAL_ISSUE_DATA,
  GHG_EMISSIONS_DATA,
} from '../../../Utils/apiList';
import Api from '../../../Utils/api';
import { errorsHandler, sendNotification } from '../../../Utils/globalFunctions';

// Get project phase names
export const getProjectPhaseNames = (projectId) => (dispatch) => Api.get(PROJECT_PHASE_DURATIONS, {
  action: 'filter', 'filter-keys': 'project', 'filter-values': projectId,
}).then(
  (res) => {
    dispatch({ type: PROJECT_PHASE_NAMES, payload: res.data.resource_list });
  },
  (err) => err,
);

// Get project phase years
export const getProjectPhaseYear = (projectId, phaseId) => (dispatch) => Api.get(`${PROJECT_PHASE_DURATIONS}/${`{"project_id":${projectId},"phase_id":${phaseId}}`}`).then(
  (res) => {
    dispatch({ type: PROJECT_PHASE_YEARS, payload: res.data.resource });
  },
  (err) => err,
);

// Table post data
export const postTableData = (values) => (dispatch) => Api.post(PROJECT_MATERIAL_ISSUE_DATA, values).then(() => {
  dispatch({ type: STATIONARY_TABLE_POST_DATA, payload: values });
  return true;
},
(err) => {
  errorsHandler(err);
  return false;
});

// delete table data
export const deleteTableRowData = (urlData) => (dispatch) => Api.delete(`${PROJECT_MATERIAL_ISSUE_DATA}/${JSON.stringify(urlData)}`).then(
  () => {
    dispatch({ type: DELETE_TABLE_DATA, payload: true });
  },
  (err) => err,
);

// Table update data
export const updateTableData = (urlData, values) => (dispatch) => Api.put(`${PROJECT_MATERIAL_ISSUE_DATA}/${JSON.stringify(urlData)}`, values).then(() => {
  dispatch({ type: UPDATE_TABLE_DATA, payload: values });
  return true;
},
(err) => {
  errorsHandler(err);
  return false;
});

// GHG calculate post data
export const ghgCalculateData = (values) => (dispatch) => Api.post(GHG_EMISSIONS_DATA, values).then(
  () => {
    dispatch({ type: GHG_CALCULATE_POST_DATA, payload: values });
    sendNotification('success', 'Calculated Successfully', 2000, 'top-center');
    return true;
  },
  (err) => err,
);
