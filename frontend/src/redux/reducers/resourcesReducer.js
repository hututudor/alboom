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
		case EDIT_RESOURCE:
			newState.resources = newState.resources.map((resource, index) => {
				if (resource.uuid !== action.uuid) {
					return resource;
				} else {
					return action.resource;
				}
			});
			break;
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
