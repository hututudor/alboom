import { UPDATE_USER, LOGOUT } from '../types';

export function updateUser(user) {
	return {
		type: UPDATE_USER,
		user
	};
}

export function logout() {
	return {
		type: LOGOUT
	};
}
