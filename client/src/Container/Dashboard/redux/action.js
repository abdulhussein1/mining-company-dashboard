import {
  MINE_TYPE_LIST, MINE_STATUS_LIST, SUB_INDUSTRY_LIST, CREATE_PROJECT, PROJECT_LISTING,
  PROJECT_NAME_CHECK_ERROR, PROJECT_NAME_CHECK_SUCCESS, PROJECT_NAME_CHECK_START,
  PROJECT_DETAIL, PROJECT_PHASES, UPDATE_PROJECT, PROJECT_DETAIL_SEGMENTS,
  PROJECT_DETAIL_DATA_KEY,
  BUSINESS_MINING_PRODUCTS,
  UNIT_OF_PHYSICAL_MEASURE,
  CREATE_DEFAULT_SCENARIOS,
  SCENARIO_LIST,
  CREATE_NEW_SCENARIOS,
  UPDATE_SCENARIO,
  DELETE_PROJECT,
  GET_PROJECT_SECTOR,
  GET_PHASES_DURATION,
  UPDATE_PHASES_DURATION,
  GET_PROJECT_TABLE_DETAIL,
  DELETE_PHASE,
  DELETE_PROJECT_TABLE_DETAIL,
  UPDATE_PROJECT_TABLE_DETAIL,
  GET_PRODUCTION_TABLE_DETAIL,
  GET_TURNOVER_TABLE_DETAIL,
  GET_EMPLOYEE_TABLE_DETAIL,
  UPDATE_PRODUCTION_TABLE_DETAIL,
  DELETE_PRODUCTION_TABLE_DETAIL,
  UPDATE_TURNOVER_TABLE_DETAIL,
  DELETE_TURNOVER_TABLE_DETAIL,
  UPDATE_EMPLOYEE_TABLE_DETAIL,
  DELETE_EMPLOYEE_TABLE_DETAIL,
} from './constant';

import {
  META_BUSINESS_MINING_TYPES, META_BUSINESS_MINING_STATUSES,
  META_BUSINESS_INDUSTRY, PROJECTS, META_PROJECT_PHASES,
  META_PROJECT_DETAIL_SEGMENTS, META_PROJECT_DETAIL_DATA_KEYS,
  META_BUSINESS_MINING_PRODUCTS, META_UNIT_OF_PHYSICAL_MEASURE,
  PROJECT_PHASE_DURATIONS, PROJECT_DETAILS, PROJECT_SCENARIOS,
} from '../../../Utils/apiList';
import Api from '../../../Utils/api';
import { errorsHandler } from '../../../Utils/globalFunctions';

// Fetching mining type
export const getMiningType = () => (dispatch) => Api.get(META_BUSINESS_MINING_TYPES, { action: 'filter', format: 'dereference' }).then(
  (res) => {
    dispatch({ type: MINE_TYPE_LIST, payload: res.data.resource_list });
  },
  (err) => err,
);

// fetching mining status
export const getMiningStatus = () => (dispatch) => Api.get(META_BUSINESS_MINING_STATUSES, { action: 'filter', format: 'dereference' }).then(
  (res) => {
    dispatch({ type: MINE_STATUS_LIST, payload: res.data.resource_list });
  },
  (err) => err,
);

// fetching business industry
export const getSubIndustry = (sectorType) => (dispatch) => Api.get(META_BUSINESS_INDUSTRY, {
  action: 'filter', format: 'dereference', 'filter-keys': 'business_sector', 'filter-values': sectorType,
}).then(
  (res) => {
    dispatch({ type: SUB_INDUSTRY_LIST, payload: res.data.resource_list });
  },
  (err) => err,
);

// creating new project
export const createProject = (values) => (dispatch) => (
  Api.post(PROJECTS, values).then((res) => {
    dispatch({ type: CREATE_PROJECT, payload: { ...values, id: res.data.resource.id } });
    return true;
  }, (err) => errorsHandler(err))
);

// delete project
export const deleteProjectData = (projectId) => (dispatch) => Api.delete(`${PROJECTS}/${projectId}`).then(() => {
  dispatch({ type: DELETE_PROJECT, payload: true });
  return true;
}, (err) => { errorsHandler(err); return false; });

// Project Name Check
export const projectNameCheck = ({ tempId, name }) => (dispatch) => {
  dispatch({ type: PROJECT_NAME_CHECK_START });
  return Api.get(PROJECTS, { action: 'filter', 'filter-keys': 'owner_user,name', 'filter-values': `${tempId},${name}` }).then(() => {
    dispatch({ type: PROJECT_NAME_CHECK_SUCCESS, payload: false });
    return true;
  }, () => {
    dispatch({ type: PROJECT_NAME_CHECK_ERROR, payload: false });
    return false;
  });
};

// get project list
export const getProjectLists = (userId) => (dispatch) => {
  Api.get(PROJECTS, { action: 'filter', 'filter-keys': 'owner_user', 'filter-values': userId }).then((res) => {
    dispatch({ type: PROJECT_LISTING, payload: res.data.resource_list });
  }, () => {
    dispatch({ type: PROJECT_LISTING, payload: false });
  });
};

// get project detail
export const getProjectDetail = (projectId) => (dispatch) => {
  Api.get(`${PROJECTS}/${projectId}`, {}).then((res) => {
    dispatch({ type: PROJECT_DETAIL, payload: res.data.resource });
  }, (err) => errorsHandler(err));
};

// get project sector detail
export const getProjectSector = (getIndustryId) => (dispatch) => {
  Api.get(`${META_BUSINESS_INDUSTRY}/${getIndustryId}`, {}).then((res) => {
    dispatch({ type: GET_PROJECT_SECTOR, payload: res.data.resource });
  });
};

// Update project detail
export const updateProjectDetails = ({ data, projectId }) => (dispatch) => Api.put(`${PROJECTS}/${projectId}`, data).then(() => {
  dispatch({ type: UPDATE_PROJECT, payload: data });
  return true;
}, (err) => { errorsHandler(err); return false; });

// Fetching project phases
export const getProjectPhases = () => (dispatch) => Api.get(META_PROJECT_PHASES, { action: 'filter', format: 'dereference' }).then(
  (res) => {
    dispatch({ type: PROJECT_PHASES, payload: res.data.resource_list });
  },
  (err) => err,
);

// Fetching overview table data categories
export const getMetaProjectDetailSegments = () => (dispatch) => Api.get(META_PROJECT_DETAIL_SEGMENTS, { action: 'filter', format: 'dereference' }).then(
  (res) => {
    dispatch({ type: PROJECT_DETAIL_SEGMENTS, payload: res.data.resource_list });
  },
  (err) => err,
);

// Fetching overview table headings
export const getMetaProjectDetailDataKeys = () => (dispatch) => Api.get(META_PROJECT_DETAIL_DATA_KEYS, { action: 'filter', 'filter-keys': 'project_detail_segment', 'filter-values': 'mining_products' }).then(
  (res) => {
    dispatch({ type: PROJECT_DETAIL_DATA_KEY, payload: res.data.resource_list });
  },
  (err) => err,
);

// Fetching Product extracted at mine site
export const getMetaBusinessMiningProducts = () => (dispatch) => Api.get(META_BUSINESS_MINING_PRODUCTS, { action: 'filter', format: 'dereference' }).then(
  (res) => {
    dispatch({ type: BUSINESS_MINING_PRODUCTS, payload: res.data.resource_list });
  },
  (err) => err,
);

// Fetching unit million billion
export const getMetaUnitOfPhysicalMeasure = () => (dispatch) => Api.get(META_UNIT_OF_PHYSICAL_MEASURE, { action: 'filter', format: 'dereference' }).then(
  (res) => {
    dispatch({ type: UNIT_OF_PHYSICAL_MEASURE, payload: res.data.resource_list });
  },
  (err) => err,
);

// creating new phases
export const createProjectPhasesDuration = (values) => () => (
  Api.post(PROJECT_PHASE_DURATIONS, values).then(() => (true), (err) => (err))
);

// creating project detail modal
export const createProjectDetailModal = (values) => () => (
  Api.post(PROJECT_DETAILS, values).then(() => (true), (err) => errorsHandler(err))
);

// creating default scenario
export const createDefaultScenarios = (projectId) => (dispatch) => (
  Api.post(PROJECT_SCENARIOS, { project_id: projectId, scenario_name: null }).then(() => {
    dispatch({ type: CREATE_DEFAULT_SCENARIOS, payload: true });
    return true;
  }, (err) => errorsHandler(err))
);

// Fetching scenario lists
export const getScenarioList = (projectId) => (dispatch) => Api.get(PROJECT_SCENARIOS, { action: 'filter', 'filter-keys': 'project', 'filter-values': projectId }).then(
  (res) => {
    dispatch({ type: SCENARIO_LIST, payload: res.data.resource_list });
  },
  (err) => err,
);

// creating new scenario
export const createNewScenarios = ({ projectId, scenarioName }) => (dispatch) => (
  Api.post(PROJECT_SCENARIOS, { project_id: projectId, scenario_name: scenarioName }).then(() => {
    dispatch({ type: CREATE_NEW_SCENARIOS, payload: true });
    return true;
  }, (err) => errorsHandler(err))
);

// Update scenario
// eslint-disable-next-line max-len
export const updateScenarioName = ({ data, projectId, scenarioId }) => (dispatch) => Api.put(`${PROJECT_SCENARIOS}/${`{"project_id":${projectId},"scenario_id":${scenarioId}}`}`, data).then(() => {
  dispatch({ type: UPDATE_SCENARIO, payload: data });
  return true;
}, (err) => { errorsHandler(err); return false; });

// Fetching project phases
export const getPhasesDuration = (projectId) => (dispatch) => Api.get(PROJECT_PHASE_DURATIONS, { action: 'filter', 'filter-keys': 'project', 'filter-values': projectId }).then((res) => {
  dispatch({ type: GET_PHASES_DURATION, payload: res.data.resource_list });
}, () => {
  dispatch({ type: GET_PHASES_DURATION, payload: false });
});

// Update project detail phases
export const updatePhasesDuration = (projectId, phaseId, data) => (dispatch) => {
  // eslint-disable-next-line no-param-reassign
  delete data.phase_id;
  return Api.put(`${PROJECT_PHASE_DURATIONS}/${`{"project_id":${projectId},"phase_id":${phaseId}}`}`, data).then(() => {
    dispatch({ type: UPDATE_PHASES_DURATION, payload: data });
    return true;
  }, (err) => err);
};

// delete phases
export const deletePhases = (projectId, phaseId) => (dispatch) => Api.delete(`${PROJECT_PHASE_DURATIONS}/${`{"project_id":${projectId},"phase_id":${phaseId}}`}`).then(() => {
  dispatch({ type: DELETE_PHASE, payload: true });
  dispatch({ type: GET_PHASES_DURATION, payload: false });
}, (err) => {
  errorsHandler(err);
});

// project detail table data
export const getProjectTableDetail = (projectId, it) => (dispatch) => {
  Api.get(PROJECT_DETAILS, { action: 'filter', 'filter-keys': 'project,project_detail_segment,data_key', 'filter-values': `${projectId},mining_products,${it}` }).then((res) => {
    const xyz = Object(res.data.resource_list);
    const payl = {
      name: it,
      values: xyz,
    };
    dispatch({ type: GET_PROJECT_TABLE_DETAIL, payload: payl });
  });
};
// delete project details table data
export const deleteProjectDetailTableData = (projectId, groupId, it) => (dispatch) => {
  Api.delete(`${PROJECT_DETAILS}/${`{"project_id":${projectId},"segment_id":"mining_products","group_id":${groupId},"data_key":"${it}"}`}`).then(() => {
    dispatch({ type: DELETE_PROJECT_TABLE_DETAIL, payload: true });
  }, (err) => err);
};
// update project details table data
export const updateProjectDetailTableData = (projectId, groupId, it, data) => (dispatch) => {
  Api.put(`${PROJECT_DETAILS}/${`{"project_id":${projectId},"segment_id":"mining_products","group_id":${groupId},"data_key":"${it}"}`}`, { data_value: data }).then(() => {
    dispatch({ type: UPDATE_PROJECT_TABLE_DETAIL, payload: data });
  }, (err) => err);
};

// Production details table data
export const getProductionTableData = (projectId, it) => (dispatch) => {
  Api.get(PROJECT_DETAILS, { action: 'filter', 'filter-keys': 'project,project_detail_segment,data_key', 'filter-values': `${projectId},production_details,${it}` }).then((res) => {
    const xyz = Object(res.data.resource_list);
    const payl = {
      name: it,
      values: xyz,
    };
    dispatch({ type: GET_PRODUCTION_TABLE_DETAIL, payload: payl });
  });
};

// creating production detail modal
export const createSecondDetailModal = (values) => () => (
  Api.post(PROJECT_DETAILS, values).then(() => (true), (err) => errorsHandler(err))
);

// update production details table data
export const updateProductionDetailTableData = (projectId, groupId, it, data) => (dispatch) => {
  Api.put(`${PROJECT_DETAILS}/${`{"project_id":${projectId},"segment_id":"production_details","group_id":${groupId},"data_key":"${it}"}`}`, { data_value: data }).then(() => {
    dispatch({ type: UPDATE_PRODUCTION_TABLE_DETAIL, payload: data });
  }, (err) => err);
};
// delete production details table data
export const deleteProductionDetailTableData = (projectId, groupId, it) => (dispatch) => {
  Api.delete(`${PROJECT_DETAILS}/${`{"project_id":${projectId},"segment_id":"production_details","group_id":${groupId},"data_key":"${it}"}`}`).then(() => {
    dispatch({ type: DELETE_PRODUCTION_TABLE_DETAIL, payload: true });
  }, (err) => err);
};

// Turnover table data
export const getTurnoverTableData = (projectId, it) => (dispatch) => {
  Api.get(PROJECT_DETAILS, { action: 'filter', 'filter-keys': 'project,project_detail_segment,data_key', 'filter-values': `${projectId},turnover,${it}` }).then((res) => {
    const xyz = Object(res.data.resource_list);
    const payl = {
      name: it,
      values: xyz,
    };
    dispatch({ type: GET_TURNOVER_TABLE_DETAIL, payload: payl });
  });
};
// update Turnover details table data
export const updateTurnoverDetailTableData = (projectId, groupId, it, data) => (dispatch) => {
  Api.put(`${PROJECT_DETAILS}/${`{"project_id":${projectId},"segment_id":"turnover","group_id":${groupId},"data_key":"${it}"}`}`, { data_value: data }).then(() => {
    dispatch({ type: UPDATE_TURNOVER_TABLE_DETAIL, payload: data });
  }, (err) => err);
};
// delete Turnover details table data
export const deleteTurnoverDetailTableData = (projectId, groupId, it) => (dispatch) => {
  Api.delete(`${PROJECT_DETAILS}/${`{"project_id":${projectId},"segment_id":"turnover","group_id":${groupId},"data_key":"${it}"}`}`).then(() => {
    dispatch({ type: DELETE_TURNOVER_TABLE_DETAIL, payload: true });
  }, (err) => err);
};

// Employee table data
export const getEmployeeTableData = (projectId, it) => (dispatch) => {
  Api.get(PROJECT_DETAILS, { action: 'filter', 'filter-keys': 'project,project_detail_segment,data_key', 'filter-values': `${projectId},employee_details,${it}` }).then((res) => {
    const xyz = Object(res.data.resource_list);
    const payl = {
      name: it,
      values: xyz,
    };
    dispatch({ type: GET_EMPLOYEE_TABLE_DETAIL, payload: payl });
  });
};
// update Employee details table data
export const updateEmployeeDetailTableData = (projectId, groupId, it, data) => (dispatch) => {
  Api.put(`${PROJECT_DETAILS}/${`{"project_id":${projectId},"segment_id":"employee_details","group_id":${groupId},"data_key":"${it}"}`}`, { data_value: data }).then(() => {
    dispatch({ type: UPDATE_EMPLOYEE_TABLE_DETAIL, payload: data });
  }, (err) => err);
};
// delete Employee details table data
export const deleteEmployeeDetailTableData = (projectId, groupId, it) => (dispatch) => {
  Api.delete(`${PROJECT_DETAILS}/${`{"project_id":${projectId},"segment_id":"employee_details","group_id":${groupId},"data_key":"${it}"}`}`).then(() => {
    dispatch({ type: DELETE_EMPLOYEE_TABLE_DETAIL, payload: true });
  }, (err) => err);
};
