import axios from 'axios';
import * as token from './tokenService';

export const apiUrl = '/api';
export const imageUrl = 'http://localhost:8000/image';

const getAuth = () => {
	return {
		headers: { Authorization: 'Bearer ' + token.get() }
	};
};

export const getPrivate = url => {
	return axios.get(apiUrl + url, getAuth());
};

export const getPublic = url => {
	return axios.get(apiUrl + url);
};

export const postPublic = (url, data) => {
	return axios.post(apiUrl + url, data);
};

export const postPrivate = (url, data) => {
	return axios.post(apiUrl + url, data, getAuth());
};

export const putPrivate = (url, data) => {
	return axios.put(apiUrl + url, data, getAuth());
};

export const deletePrivate = url => {
	return axios.delete(apiUrl + url, getAuth());
};
