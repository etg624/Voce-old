import createContext from '../createContext';

const initialState = {
  currentUser: { id: '', username: '' },

  pressedUserData: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER_DATA':
      return {
        ...state,
        currentUser: {
          id: action.data.id,
          username: action.data.username,
        },
      };

    case 'RESET_PRESSED_USER_STATE':
      return { ...state, pressedUserData: null };
    default:
      return state;
  }
};

const setCurrentUserData = dispatch => data => {
  dispatch({ type: 'SET_CURRENT_USER_DATA', data });
};

export const { Context, Provider } = createContext(
  userReducer,
  { setCurrentUserData },
  initialState
);
