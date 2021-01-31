export const ads_home = (state = [], action) => {
	const { type, value } = action;
	switch (type) {
		case 'SET_ADS_HOME':
			return [...value];
		case 'UNSHIFT_AD_HOME':
			state.unshift(value);
			return state;
		case 'UNSHIFT_ADS_HOME':
			return value.concat(state);
		case 'PUSH_AD_HOME':
			state.push(value);
			return state;
		case 'PUSH_ADS_HOME':
			state.push(...value);
			return state;
		default:
			return state;
	}
};
