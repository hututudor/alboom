import {
	GET_RESOURCES,
	ADD_RESOURCE,
	EDIT_RESOURCE,
	DELETE_RESOURCE,
	REMOVE_RESOURCES
} from '../types';

export const getResources = resources => {
	return {
		type: GET_RESOURCES,
		resources
	};
};

export const addResource = resource => {
	return {
		type: ADD_RESOURCE,
		resource
	};
};

export const removeResources = () => {
	return {
		type: REMOVE_RESOURCES
	};
};
