import {
  RECIPE_LOADING,
  GET_RECIPES,
  GET_DETAIL_RECIPE,
  GET_ERRORS,
  CREATE_RECIPE,
  LIKE_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  SAVE_RECIPE,
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_Cartlist,
  GET_Useraddress,
  GET_PAYMENT,
} from "./types";
import axios from "axios";

import axiosInstance from "../../utils/axios";
import { tokenConfig } from "./auth";
// const baseURL = "http://localhost:8000";
const baseURL = "http://127.0.0.1:8000/rocknest";

export const payment_save = (data) => () => {
  axios
    .post(`${baseURL}/payment/`, data)
    .then((res) => {
      // console.log(res, "cart_list123456789");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err, "error123456789");
    });
};
export const create_address = (data) => (dispatch) => {
  axios
    .post(`${baseURL}/address/create_or_update_address/`, data)
    .then((res) => {
      // console.log(res, "cart_list123456789");
      dispatch({
        type: GET_Useraddress,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, "error123456789");
    });
};
export const getCart_list = (data) => (dispatch) => {
  
  axios.post(`${baseURL}/cart_list/`, data)
    .then((res) => {
      // console.log(res, "cart_list123456789");
      dispatch({
        type: GET_Cartlist,
        payload: res.data,
      });
      
    })
    .catch((err) => {
      console.log(err, "error123456789");
    });
};
export const getpayment = (data) => (dispatch) => {
  axios
    .post(`${baseURL}/payment/`, data)
    .then((res) => {
      // console.log(res, "cart_list123456789");
      dispatch({
        type: GET_PAYMENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, "error123456789");
    });
};
export const getProducts = () => (dispatch) => {
  axios({
    method: "GET",
    url: `${baseURL}/products/`,
  })
    .then((res) => {
      // console.log(res, "123456789");
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, "error123456789");
    });
};
export const getclassic_product = () => (dispatch) => {
  axios({
    method: "GET",
    url: `${baseURL}/products/classic`,
  })
    .then((res) => {
      // console.log(res, "123456789");
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, "error123456789");
    });
};
export const getmodern_product = () => (dispatch) => {
  axios({
    method: "GET",
    url: `${baseURL}/products/modern`,
  })
    .then((res) => {
      // console.log(res, "123456789");
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, "error123456789");
    });
};
export const getProduct = (id) => (dispatch) => {
  axios
    .get(`${baseURL}/product/${id}/`)
    .then((res) => {
      // console.log(res, "123456789");
      dispatch({
        type: GET_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, "error123456789");
    });
};

export const getRecipes = () => (dispatch) => {
  dispatch({ type: RECIPE_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axiosInstance
    .get("/recipe/", null, config)
    .then((res) => {
      dispatch({
        type: GET_RECIPES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

export const getDetailRecipe = (id) => (dispatch, getState) => {
  dispatch({ type: RECIPE_LOADING });

  axiosInstance
    .get(`/recipe/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_DETAIL_RECIPE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

export const createRecipe = (formData) => (dispatch, getState) => {
  dispatch({ type: RECIPE_LOADING });

  axiosInstance
    .post("/recipe/create/", formData, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: CREATE_RECIPE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

export const editRecipe = (id, formData) => (dispatch, getState) => {
  dispatch({ type: RECIPE_LOADING });

  axiosInstance
    .patch(`/recipe/${id}/`, formData, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: EDIT_RECIPE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

export const deleteRecipe = (id) => (dispatch, getState) => {
  dispatch({ type: RECIPE_LOADING });

  axiosInstance
    .delete(`/recipe/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_RECIPE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

export const likeRecipe = (id) => (dispatch, getState) => {
  dispatch({ type: RECIPE_LOADING });

  axiosInstance
    .post(`/recipe/${id}/like/`, null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LIKE_RECIPE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

export const saveRecipe = (user_id, id) => (dispatch, getState) => {
  dispatch({ type: RECIPE_LOADING });

  const body = JSON.stringify({ id });

  axiosInstance
    .post(`/user/profile/${user_id}/bookmarks/`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: SAVE_RECIPE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};
