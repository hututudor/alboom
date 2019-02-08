import * as http from './httpService';

export const getResource = uuid => {
	return http.getPublic('/public/resources/' + uuid);
};

export const getAlbum = uuid => {
	return http.getPublic('/public/albums/' + uuid);
};
