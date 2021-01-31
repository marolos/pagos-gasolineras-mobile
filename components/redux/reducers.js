import { combineReducers } from 'redux';
import { user } from './auth/reducers';
import { notifications, newNotification } from './notification/reducers';
import { userLocation } from './geolocation/reducers';
import { activeTab } from './ui/reducers';
import { tips } from './tips/reducers';
import { ads } from './ads/reducers';
import { ads_home } from './ads_home/reducers';
import { cards } from './payment/reducers';


const rootReducers = combineReducers({
	activeTab,
	notifications,
	newNotification,
	userLocation,
	user,
	tips,
	ads,
	cards,
	ads_home
});

export default rootReducers;
