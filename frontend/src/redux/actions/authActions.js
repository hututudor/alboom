import { UPDATE_USER, LOGOUT } from '../types';

export const updateUser = user => {
	return {
		type: UPDATE_USER,
		user
	};
};

export const logout = () => {
	return {
		type: LOGOUT
	};
};
