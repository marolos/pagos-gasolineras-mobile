import { combineReducers } from 'redux';
import * as authReducers from './auth/reducers'

export const TabOptions = {
	GAS: 'GAS',
	SEARCH: 'SEARCH',
	NOTIFICATIONS: 'NOTIFICATIONS'
}

const activeTab = (state = TabOptions.GAS, action) => {
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
