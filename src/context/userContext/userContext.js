import createContext from '../createContext';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../graphql/queries';

const initialState = {
  currentUser: null,

  pressedUserData: null,
  userLoading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_LOADING':
      return { ...state, userLoading: action.bool };
    case 'SET_CURRENT_USER_DATA':
      return {
        ...state,
        currentUser: action.data,
      };
    case 'GET_USER_DATA_BY_ID':
      return {
        ...state,
        pressedUserData: action.data,
      };
    case 'RESET_PRESSED_USER_STATE':
      return { ...state, userLoading: true, pressedUserData: null };
    default:
      return state;
  }
};

const setCurrentUserData = dispatch => data => {
  dispatch({ type: 'SET_CURRENT_USER_DATA', data });
};

const setLoading = bool => ({ type: 'SET_USER_LOADING', bool });
const resetPressedUserState = dispatch => () => dispatch({ type: 'RESET_PRESSED_USER_STATE' });

const getUserDataById = dispatch => async id => {
  try {
    setLoading(true);
    const res = await API.graphql(graphqlOperation(getUser, { id }));

    dispatch({ type: 'GET_USER_DATA_BY_ID', data: res.data.getUser });
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  }
};

export const { Context, Provider } = createContext(
  userReducer,
  { setCurrentUserData, getUserDataById, resetPressedUserState },
  initialState
);
