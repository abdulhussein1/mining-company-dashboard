import {
  MINE_TYPE_LIST, MINE_STATUS_LIST, SUB_INDUSTRY_LIST,
  CREATE_PROJECT, PROJECT_LISTING, PROJECT_NAME_CHECK_START, PROJECT_NAME_CHECK_ERROR,
  PROJECT_NAME_CHECK_SUCCESS,
  PROJECT_DETAIL,
  PROJECT_PHASES,
  UPDATE_PROJECT,
  PROJECT_DETAIL_SEGMENTS,
  PROJECT_DETAIL_DATA_KEY,
  BUSINESS_MINING_PRODUCTS,
  UNIT_OF_PHYSICAL_MEASURE,
  PROJECT_PHASE_DURATION,
  CREATE_DEFAULT_SCENARIOS,
  SCENARIO_LIST,
  CREATE_NEW_SCENARIOS,
  UPDATE_SCENARIO,
  DELETE_PROJECT,
  GET_PROJECT_SECTOR,
  GET_PHASES_DURATION,
  UPDATE_PHASES_DURATION,
  GET_PROJECT_TABLE_DETAIL,
  GET_PRODUCTION_TABLE_DETAIL,
  GET_TURNOVER_TABLE_DETAIL,
  GET_EMPLOYEE_TABLE_DETAIL,
} from './constant';

const INITIAL_STATE = {
  minetype: [],
  minestatus: [],
  subindustry: [],
  metaProjectDetailDataKeys: [],
  getProjectListing: [],
  createNewProject: {},
  updateProjectData: '',
  projectDetailData: {},
  projectPhaseDuration: {},
  defaultScenarios: {},
  newScenario: {},
  updateScenario: {},
  projectPhasesData: [],
  scenarioList: [],
  metaBusinessMiningProducts: [],
  metaProjectDetailSegments: [],
  metaUnitOfPhysicalMeasure: [],
  getProjectTableDetailData: {},
  getProductionTableDetailData: {},
  getTurnoverTableDetailData: {},
  getEmployeeTableDetailData: {},
  deleteProject: {},
  projectNameVerify: {
    loading: false,
    status: false,
  },
  getProjectSectorData: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MINE_TYPE_LIST:
      return {
        ...state, minetype: action.payload,
      };
    case MINE_STATUS_LIST:
      return {
        ...state, minestatus: action.payload,
      };
    case SUB_INDUSTRY_LIST:
      return {
        ...state, subindustry: action.payload,
      };
    case CREATE_PROJECT:
      return {
        ...state, createNewProject: action.payload,
      };
    case DELETE_PROJECT:
      return {
        ...state, deleteProject: action.payload,
      };
    case PROJECT_LISTING:
      return {
        ...state, getProjectListing: action.payload,
      };
    case PROJECT_NAME_CHECK_START:
      return {
        ...state,
        projectNameVerify: {
          loading: true,
          status: false,
        },
      };
    case PROJECT_NAME_CHECK_SUCCESS:
      return {
        ...state,
        projectNameVerify: {
          loading: false,
          status: true,
        },
      };
    case PROJECT_NAME_CHECK_ERROR:
      return {
        ...state,
        projectNameVerify: {
          loading: false,
          status: false,
        },
      };
    case PROJECT_DETAIL:
      return {
        ...state, projectDetailData: action.payload,
      };
    case UPDATE_PROJECT:
      return {
        ...state, projectDetailData: { ...state.projectDetailData, attributes: action.payload },
      };
    case GET_PROJECT_SECTOR:
      return {
        ...state, getProjectSectorData: action.payload,
      };
    case PROJECT_PHASES:
      return {
        ...state, projectPhasesData: action.payload,
      };
    case PROJECT_DETAIL_SEGMENTS:
      return {
        ...state, metaProjectDetailSegments: action.payload,
      };
    case PROJECT_DETAIL_DATA_KEY:
      return {
        ...state, metaProjectDetailDataKeys: action.payload,
      };
    case BUSINESS_MINING_PRODUCTS:
      return {
        ...state, metaBusinessMiningProducts: action.payload,
      };
    case UNIT_OF_PHYSICAL_MEASURE:
      return {
        ...state, metaUnitOfPhysicalMeasure: action.payload,
      };
    case PROJECT_PHASE_DURATION:
      return {
        ...state, projectPhaseDuration: action.payload,
      };
    case CREATE_DEFAULT_SCENARIOS:
      return {
        ...state, defaultScenarios: action.payload,
      };
    case SCENARIO_LIST:
      return {
        ...state, scenarioList: action.payload,
      };
    case CREATE_NEW_SCENARIOS:
      return {
        ...state, newScenario: action.payload,
      };
    case UPDATE_SCENARIO:
      return {
        ...state, updateScenario: action.payload,
      };
    case GET_PHASES_DURATION:
      return {
        ...state, getProjectPhasesDuration: action.payload,
      };
    case UPDATE_PHASES_DURATION:
      return {
        ...state, updateProjectPhasesDuration: action.payload,
      };
    case GET_PROJECT_TABLE_DETAIL:
      // eslint-disable-next-line no-case-declarations
      const data = {
        ...state.getProjectTableDetailData,
        [action.payload.name]: action.payload.values,
      };
      return {
        ...state, getProjectTableDetailData: data,
      };
    case GET_PRODUCTION_TABLE_DETAIL:
      // eslint-disable-next-line no-case-declarations
      const productionData = {
        ...state.getProductionTableDetailData,
        [action.payload.name]: action.payload.values,
      };
      return {
        ...state, getProductionTableDetailData: productionData,
      };
    case GET_TURNOVER_TABLE_DETAIL:
      // eslint-disable-next-line no-case-declarations
      const turnoverData = {
        ...state.getTurnoverTableDetailData,
        [action.payload.name]: action.payload.values,
      };
      return {
        ...state, getTurnoverTableDetailData: turnoverData,
      };
    case GET_EMPLOYEE_TABLE_DETAIL:
      // eslint-disable-next-line no-case-declarations
      const employeeData = {
        ...state.getEmployeeTableDetailData,
        [action.payload.name]: action.payload.values,
      };
      return {
        ...state, getEmployeeTableDetailData: employeeData,
      };
    default: return state;
  }
};

export default reducer;
