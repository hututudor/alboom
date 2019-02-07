import language from '../languages';
import _ from 'lodash';

export const get = name => {
	return _.get(
		language[localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en']
			.default,
		name
	);
};
