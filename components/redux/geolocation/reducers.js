import { MAP_CENTER } from '../../utils/constants';

export const userLocation = (state = MAP_CENTER, action) => {
	switch (action.type) {
		case 'SET_USER_LOCATION':
			return action.value;
		default:
			return state;
	}
};
