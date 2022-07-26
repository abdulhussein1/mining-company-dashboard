import { combineReducers } from 'redux';
import registerReducer from '../Container/Register/redux/reducer';
import dashboardReducer from '../Container/Dashboard/redux/reducer';
import waterReducer from '../Container/Water-Management/redux/reducer';
import energyAndClimateReducer from '../Container/EnergyClimateChange/redux/reducer';
import componentReducer from '../Components/redux/reducer';

const reducer = combineReducers({
  registerReducer,
  dashboardReducer,
  energyAndClimateReducer,
  componentReducer,
  waterReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return reducer(undefined, action);
  }

  return reducer(state, action);
};

export default rootReducer;
