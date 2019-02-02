import {
	GET_RESOURCES,
	EDIT_RESOURCE,
	ADD_RESOURCE,
	DELETE_RESOURCE,
	REMOVE_RESOURCES
} from '../types';

const initialState = {
	resources: []
};

function albumsReducer(state = initialState, action) {
	let newState = { ...state };

	switch (action.type) {
		case GET_RESOURCES:
			newState.resources = action.resources;
			break;
		case ADD_RESOURCE:
			newState.resources = [action.resource, ...state.resources];
			break;
		// case EDIT_ALBUM:
		// 	newState.albums = newState.albums.map((album, index) => {
		// 		if (album.uuid !== action.uuid) {
		// 			return album;
		// 		} else {
		// 			return action.album;
		// 		}
		// 	});
		// 	break;
		case DELETE_RESOURCE:
			newState.resources = state.resources.filter(
				obj => obj.uuid !== action.uuid
			);
			break;
		case REMOVE_RESOURCES:
			newState.resources = [];
			break;
		default:
			break;
	}

	return newState;
}

export default albumsReducer;
