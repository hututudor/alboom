import axios from 'axios';
import * as token from './tokenService';

export const apiUrl = '';

export const getPrivate = url => {
	return axios.get(apiUrl + url, {
		headers: { Authorization: 'Bearer ' + token.get() }
	});
};

export const getPublic = url => {
	return axios.get(apiUrl + url);
};

export const postPublic = (url, data) => {
	return axios.post(apiUrl + url, data);
};
