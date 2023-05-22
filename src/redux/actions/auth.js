import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  GET_ERRORS,
  CLEAR_MESSAGE,
} from "./types";
import axios from "axios";

import axiosInstance from "../../utils/axios";
const baseURL = "http://127.0.0.1:8000";

export const register =
  ({ username, email, password, confirmPassword }) =>
  (dispatch) => {
    // const config = {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'X-CSRFToken': "wrActQjzTCxLCJBeA7OBLDEAbEfJz0mBybxbiTGL6ZJEJy4KzPXtfeETLXXNNFCN"
    //   }
    // };

    if (password === confirmPassword) {
      const body = ({
        username:username,
        email:email,
        password:password,
      });
      // console.log(body,"body123456789");
       
        axios.post(`${baseURL}/signup/`, body)
        .then((res) => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
          });
          dispatch({
            type: CLEAR_MESSAGE,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response,
          });
          dispatch({
            type: REGISTER_FAIL,
          });
        });
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: {
          data: { password: ["Passwords Must Match"] },
          status: null,
        },
      });
    }
  };

export const login =
  ({ username, password }) =>
  (dispatch) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const body = ({
      username:username,
      password:password,
    });
    // console.log(body,"body123")
      axios.post(`${baseURL}/login/`, body)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CLEAR_MESSAGE,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response,
        });
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

export const logout =
  ({ refresh }) =>
  (dispatch, getState) => {
    const body = JSON.stringify({ refresh });

    axiosInstance
      .post("/user/logout/", body, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response,
        });
      });
  };

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token.access}`;
  }

  return config;
};
