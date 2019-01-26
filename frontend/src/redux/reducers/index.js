import { combineReducers } from 'redux';

import authReducer from './authReducer';
import languageReducer from './languageReducer';

export default combineReducers({
	auth: authReducer,
	lang: languageReducer
});
