import { UPDATE_LANGUAGE } from '../types';

export const updateLanguage = name => {
	return {
		type: UPDATE_LANGUAGE,
		name
	};
};
