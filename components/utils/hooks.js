import React from 'react';

export function useObjState(initialState) {
	const [value, setValue] = React.useState(initialState);

	function updateState(state) {
		setValue({ ...value, ...state });
	}

	return [value, updateState];
}
