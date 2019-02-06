import * as http from './httpService';

export const changePreference = (name, value) => {
	return http.putPrivate('/preferences', { name, value });
};
