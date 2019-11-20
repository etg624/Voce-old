import createContext from '../createContext';

const initialState = {
  currentUser: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER_DATA':
      return {
        ...state,
        currentUser: { ...state.currentUser, currentUser: action.data }
      };
    case 'SET_CURRENT_USER_ID':
      return { ...state, currentUser: { ...state.currentUser, id: action.id } };
    default:
      return state;
  }
};

const setCurrentUserData = dispatch => data => {
  dispatch({ type: 'SET_CURRENT_USER_DATA', data });
};
const setCurrentUserId = dispatch => id => {
  dispatch({ type: 'SET_CURRENT_USER_ID', id });
};
export const { Context, Provider } = createContext(
  userReducer,
  { setCurrentUserData },
  initialState
);
