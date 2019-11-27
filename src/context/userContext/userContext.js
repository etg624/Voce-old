import createContext from "../createContext";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../../graphql/queries";

const initialState = {
  currentUser: null,
  pressedUserId: "",
  pressedUserData: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER_DATA":
      return {
        ...state,
        currentUser: action.data
      };
    case "SET_PRESSED_USER_ID":
      return {
        ...state,
        pressedUserId: action.id
      };
    case "GET_USER_DATA_BY_ID":
      return {
        ...state,
        pressedUserData: action.data
      };

    default:
      return state;
  }
};

const setCurrentUserData = dispatch => data => {
  dispatch({ type: "SET_CURRENT_USER_DATA", data });
};

const getUserDataById = dispatch => async id => {
  const res = await API.graphql(graphqlOperation(getUser, { id }));
  dispatch({ type: "GET_USER_DATA_BY_ID", data: res.data.getUser });
};

const setPressedUserId = dispatch => id => {
  dispatch({ type: "SET_PRESSED_USER_ID", id });
};

export const { Context, Provider } = createContext(
  userReducer,
  { setCurrentUserData, getUserDataById, setPressedUserId },
  initialState
);
