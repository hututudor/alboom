import { TOGGLE_MODAL } from '../types';

const initialState = {
	addAlbums: false,
	addAlbumsOptions: null,
	editAlbums: false,
	editAlbumsOptions: null,
	deleteAlbums: false,
	deleteAlbumsOptions: null,

	addResources: false,
	addResourcesOptions: null
};

function modalsReducer(state = initialState, action) {
	let newState = { ...state };

	switch (action.type) {
		case TOGGLE_MODAL:
			newState[action.name] = action.on;
			newState[action.name + 'Options'] = action.options;
			break;
		default:
			break;
	}

	return newState;
}

export default modalsReducer;
