import { SET_TITLE } from '../types';

const initialState = {
  title: 'Dashboard'
};

function dashboardReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case SET_TITLE:
      newState.title = action.title;
      break;
    default:
      break;
  }

  return newState;
}

export default dashboardReducer;
