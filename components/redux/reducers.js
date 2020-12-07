import { combineReducers } from 'redux';
import { user } from './auth/reducers';
import { notifications, newNotification } from './notification/reducers';
import { userLocation } from './geolocation/reducers';
import { activeTab } from './ui/reducers';
import { tips } from './tips/reducers';
import { ads } from './ads/reducers';

const rootReducers = combineReducers({
	activeTab,
	notifications,
	newNotification,
	userLocation,
	user,
	tips,
	ads,
});

export default rootReducers;
