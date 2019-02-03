import * as http from './httpService';

export const getAll = uuid => {
	return http.getPrivate('/resources/album/' + uuid);
};

export const remove = uuid => {
	return http.deletePrivate('/resources/' + uuid);
};

export const add = (uuid, data) => {
	return http.postPrivate('/resources/' + uuid, data);
};

export const edit = data => {
	return http.putPrivate('/resources/' + data.uuid, data);
};
