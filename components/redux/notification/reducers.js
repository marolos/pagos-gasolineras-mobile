export const notifications = (state = [], action) => {
	const { type, value } = action;
	switch (type) {
		case 'SET_NOTIFICATIONS':
			return [...value];
		case 'UNSHIFT_NOTIFICATION':
			state.unshift(value);
			return state;
		case 'UNSHIFT_NOTIFICATIONS':
			return value.concat(state);
		case 'PUSH_NOTIFICATION':
			state.push(value);
			return state;
		case 'PUSH_NOTIFICATIONS':
			state.push(...value);
			return state;
		default:
			return state;
	}
};

export const newNotification = (state = false, action) => {
	switch (action.type) {
		case 'ARRIVED_NEW':
			return true;
		case 'CLEAR_ARRIVED_NEW':
			return false;
		default:
			return state;
	}
};
