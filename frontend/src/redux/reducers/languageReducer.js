import { UPDATE_LANGUAGE } from '../types';

const initialState = {
	name: 'en'
};

function languageReducer(state = initialState, action) {
	let newState = { ...state };

	switch (action.type) {
		case UPDATE_LANGUAGE:
			newState.name = action.name;
			localStorage.setItem('lang', action.name);
			break;
		default:
			break;
	}

	return newState;
}

export default languageReducer;
