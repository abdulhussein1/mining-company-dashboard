import {
  DASHBOARD_GET_DATA,
  MATERIAL_ISSUE_CATEGORY,
  META_MATERIAL_ISSUE_ECONOMICS,
  META_MATERIAL_ISSUE_ENVIRONMENT,
  META_MATERIAL_ISSUE_GOVERNANCE,
  META_MATERIAL_ISSUE_SOCIAL,
  MATERIAL_ISSUE_CHILD,
  STATIC_FILTER,
} from './constant';

const INITIAL_STATE = {
  metaMaterialIssueCategory: [],
  metaMaterialIssueEconomics: [],
  metaMaterialIssueEnvironment: [],
  metaMaterialIssueGovernance: [],
  metaMaterialIssueSocial: [],
  getDashboardAllData: [],
  getMaterialChildLevel: [],
  saveStaticFilter: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MATERIAL_ISSUE_CATEGORY:
      return {
        ...state, metaMaterialIssueCategory: action.payload,
      };
    case META_MATERIAL_ISSUE_ECONOMICS:
      return {
        ...state, metaMaterialIssueEconomics: action.payload,
      };
    case META_MATERIAL_ISSUE_ENVIRONMENT:
      return {
        ...state, metaMaterialIssueEnvironment: action.payload,
      };
    case META_MATERIAL_ISSUE_GOVERNANCE:
      return {
        ...state, metaMaterialIssueGovernance: action.payload,
      };
    case META_MATERIAL_ISSUE_SOCIAL:
      return {
        ...state, metaMaterialIssueSocial: action.payload,
      };
    case DASHBOARD_GET_DATA:
      return {
        ...state, getDashboardAllData: action.payload,
      };
    case MATERIAL_ISSUE_CHILD:
      return {
        ...state, getMaterialChildLevel: action.payload,
      };
    case STATIC_FILTER:
      return {
        ...state, saveStaticFilter: action.payload,
      };
    default: return state;
  }
};

export default reducer;
