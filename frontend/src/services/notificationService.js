import { toast } from 'react-toastify';
import * as lang from './langService';

const options = {
	position: toast.POSITION.BOTTOM_RIGHT
};

export const error = () => {
	toast.error(lang.get('messages.error'), options);
};

export const errorN = name => {
	toast.error(lang.get(name), options);
};

export const success = name => {
	toast.success(lang.get(name), options);
};
