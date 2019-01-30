import { TOGGLE_MODAL } from '../types';

export const toggleModal = (name, on, options = null) => {
  return {
    type: TOGGLE_MODAL,
    name,
    on,
    options
  };
};
