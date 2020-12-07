export const ads = (state = [], action) => {
	const { type, value } = action;
	switch (type) {
		case 'SET_ADS':
			return [...value];
		case 'UNSHIFT_AD':
			state.unshift(value);
			return state;
		case 'UNSHIFT_ADS':
			return value.concat(state);
		case 'PUSH_AD':
			state.push(value);
			return state;
		case 'PUSH_ADS':
			state.push(...value);
			return state;
		default:
			return state;
	}
};
