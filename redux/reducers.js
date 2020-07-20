import { combineReducers } from 'redux';
import * as authReducers from './auth/reducers'

export const TabOptions = {
	HOME: 'HOME',
	SEARCH: 'SEARCH',
	NOTIFICATIONS: 'NOTIFICATIONS'
}

const activeTab = (state = TabOptions.HOME, action) => {
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
