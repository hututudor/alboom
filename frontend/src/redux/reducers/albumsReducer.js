import { GET_ALBUMS, DELETE_ALBUM, ADD_ALBUM } from '../types';

const initialState = {
  albums: []
};

function albumsReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case GET_ALBUMS:
      newState.albums = action.albums;
      break;
    case ADD_ALBUM:
      newState.albums = [action.album, ...state.albums];
      break;
    case DELETE_ALBUM:
      newState.albums = state.albums.filter(obj => obj.uuid !== action.uuid);
      break;
    default:
      break;
  }

  return newState;
}

export default albumsReducer;
