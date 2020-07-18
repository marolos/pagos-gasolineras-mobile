import { combineReducers } from 'redux';
import * as authReducers from './auth/reducers'

const activeTab = (state = 'HOME', action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return action.activeTab;
    default:
      return state;
  }
};

const rootReducers = combineReducers({
  ...authReducers,
  activeTab,
});

export default rootReducers;
