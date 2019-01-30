import { combineReducers } from 'redux';

import authReducer from './authReducer';
import languageReducer from './languageReducer';
import albumsReducer from './albumsReducer';
import dashboardReducer from './dashboardReducer';

export default combineReducers({
  auth: authReducer,
  lang: languageReducer,
  albums: albumsReducer,
  dashboard: dashboardReducer
});
