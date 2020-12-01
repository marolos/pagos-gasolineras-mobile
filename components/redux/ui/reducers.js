export const TabOptions = {
	GAS: { label: 'Gasolineras' },
	SEARCH: { label: 'Buscar' },
	NOTIFICATIONS: { label: 'Notificaciones' },
};

export const activeTab = (state = TabOptions.GAS, action) => {
	switch (action.type) {
		case 'SET_ACTIVE_TAB':
			return action.activeTab;
		default:
			return state;
	}
};
