import { SET_TITLE } from '../types';

export const setTitle = (title, param = null) => {
	return {
		type: SET_TITLE,
		title,
		param
	};
};
