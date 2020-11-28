import { combineReducers } from 'redux';
import { user } from './auth/reducers';
import { notifications, newNotification } from './notification/reducers';

export const TabOptions = {
	GAS: { label: 'Gasolineras' },
	SEARCH: { label: 'Buscar' },
	NOTIFICATIONS: { label: 'Notificaciones' },
};

const activeTab = (state = TabOptions.GAS, action) => {
	switch (action.type) {
		case 'SET_ACTIVE_TAB':
			return action.activeTab;
		default:
			return state;
	}
};

const rootReducers = combineReducers({
	activeTab,
	notifications,
	newNotification,
	user,
});

export default rootReducers;
