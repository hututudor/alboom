import * as http from './httpService';

export const getResource = uuid => {
	return http.getPublic('/public/resources/' + uuid);
};
