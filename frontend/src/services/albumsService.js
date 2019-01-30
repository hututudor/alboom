import * as http from './httpService';

export const getAll = () => {
  return http.getPrivate('/albums');
};
