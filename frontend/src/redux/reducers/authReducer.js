import { UPDATE_USER, LOGOUT } from '../types';

const initialState = {
	user: {
		auth: false
	}
};

function authReducer(state = initialState, action) {
	let newState = { ...state };

	switch (action.type) {
		case UPDATE_USER:
			newState.user = action.user;
			break;
		case LOGOUT:
			newState.user = { auth: false };
			break;
		default:
			break;
	}

	return newState;
}

export default authReducer;
