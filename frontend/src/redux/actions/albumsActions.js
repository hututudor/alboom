import { GET_ALBUMS, DELETE_ALBUM } from '../types';

export const getAlbums = albums => {
  return {
    type: GET_ALBUMS,
    albums
  };
};

export const deleteAlbum = uuid => {
  return {
    type: DELETE_ALBUM,
    uuid
  };
};
