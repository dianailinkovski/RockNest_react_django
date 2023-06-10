/* eslint-disable import/no-anonymous-default-export */
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  token: JSON.parse(sessionStorage.getItem("rocket_user")),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // console.log(action.payload.user.username, "auth123456");
      sessionStorage.setItem(
        "rocket_user",
        JSON.stringify(action.payload.tokens.refresh)
      );
      sessionStorage.setItem(
        "username",
        JSON.stringify(action.payload.user.username)
      );
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload,
        // token: action.payload.tokens,
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      sessionStorage.removeItem("rocket_user");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("cartlist_session");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
