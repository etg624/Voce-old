import createContext from '../createContext';

const initialState = {
  currentUser: {
    username: ''
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER_USERNAME':
      return {
        ...state,
        currentUser: { ...state.currentUser, username: action.username }
      };
    default:
      return state;
  }
};

const setCurrentUserUsername = dispatch => username => {
  dispatch({ type: 'SET_CURRENT_USER_USERNAME', username });
};

export const { Context, Provider } = createContext(
  userReducer,
  { setCurrentUserUsername },
  initialState
);
