import { GET_ALBUMS } from '../types';

export const getAlbums = albums => {
  return {
    type: GET_ALBUMS,
    albums
  };
};
