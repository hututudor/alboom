import { SET_TITLE } from '../types';

export const setTitle = title => {
  return {
    type: SET_TITLE,
    title
  };
};
