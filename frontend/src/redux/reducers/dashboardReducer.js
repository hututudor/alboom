import { SET_TITLE } from '../types';

const initialState = {
	title: 'Dashboard',
	param: ''
};

function dashboardReducer(state = initialState, action) {
	let newState = { ...state };

	switch (action.type) {
		case SET_TITLE:
			newState.title = action.title;
			newState.param = action.param;
			break;
		default:
			break;
	}

	return newState;
}

export default dashboardReducer;
