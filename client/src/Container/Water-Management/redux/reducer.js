import {
  PROJECT_PHASE_NAMES,
  PROJECT_PHASE_YEARS,
  STATIONARY_TABLE_POST_DATA,
  STATIONARY_TABLE_GET_DATA,
  DELETE_TABLE_DATA,
  UPDATE_TABLE_DATA,
  QUESTION_TOGGLE,
} from './constant';

const INITIAL_STATE = {
  projectPhaseNames: [],
  projectPhaseYear: {},
  stationaryTablePostData: {},
  updateTableData: {},
  questionToggleValue: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_PHASE_NAMES:
      return {
        ...state, projectPhaseNames: action.payload,
      };
    case PROJECT_PHASE_YEARS:
      return {
        ...state, projectPhaseYear: action.payload,
      };
    case STATIONARY_TABLE_POST_DATA:
      return {
        ...state, stationaryTablePostData: action.payload,
      };
    case STATIONARY_TABLE_GET_DATA:
      return {
        ...state, stationaryTableGetData: action.payload,
      };
    case DELETE_TABLE_DATA:
      return {
        ...state, deleteTableData: action.payload,
      };
    case UPDATE_TABLE_DATA:
      return {
        ...state, updateTableData: action.payload,
      };
    case QUESTION_TOGGLE:
      return {
        ...state, questionToggleValue: action.payload,
      };
    default: return state;
  }
};

export default reducer;
