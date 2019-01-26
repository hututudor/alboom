import * as http from './httpService';

export const getUser = () => {
	return http.getPrivate('/user');
};
