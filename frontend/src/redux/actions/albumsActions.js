import { GET_ALBUMS, DELETE_ALBUM, ADD_ALBUM } from '../types';

export const getAlbums = albums => {
  return {
    type: GET_ALBUMS,
    albums
  };
};

export const addAlbum = album => {
  return {
    type: ADD_ALBUM,
    album
  };
};

export const deleteAlbum = uuid => {
  return {
    type: DELETE_ALBUM,
    uuid
  };
};
