export const cards = (state = [], action) => {
	const { type, value } = action;
	switch (type) {
		case 'SET_CARDS':
			return [...value];
		default:
			return state;
	}
};
