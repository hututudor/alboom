import * as http from './httpService';

export const getAll = () => {
  return http.getPrivate('/albums');
};

export const remove = uuid => {
  return http.deletePrivate('/albums/' + uuid);
};

export const add = data => {
  return http.postPrivate('/albums', data);
};
