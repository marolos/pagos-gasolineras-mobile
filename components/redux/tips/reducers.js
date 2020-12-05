export const tips = (state = [], action) => {
	const { type, value } = action;
	switch (type) {
		case 'SET_TIPS':
			return value;
		case 'UNSHIFT_TIP':
			state.unshift(value);
			return state;
		case 'UNSHIFT_TIPS':
			return value.concat(state);
		case 'PUSH_TIP':
			state.push(value)
			return state;
		case 'PUSH_TIPS':
			state.push(...value)
			return state;
		default:
			return state;
	}
};
