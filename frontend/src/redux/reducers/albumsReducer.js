import { GET_ALBUMS } from '../types';

const initialState = {
  albums: []
};

function albumsReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case GET_ALBUMS:
      newState.albums = action.albums;
      break;
    default:
      break;
  }

  return newState;
}

export default albumsReducer;
