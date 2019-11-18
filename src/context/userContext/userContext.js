import createContext from '../createContext';
import { Auth } from 'aws-amplify';
const initialState = {
  currentUser: {
    username: ''
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: { ...state.currentUser }
      };
    default:
      return state;
  }
};

const setCurrentUser = dispatch => async () => {
  const { username } = await Auth.currentUserInfo();
  console.log(username);
  dispatch({ type: 'SET_CURRENT_USER' });
};

export const { Context, Provider } = createContext(
  userReducer,
  { setCurrentUser },
  initialState
);
