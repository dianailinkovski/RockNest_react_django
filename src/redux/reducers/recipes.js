/* eslint-disable import/no-anonymous-default-export */
import {
  RECIPE_LOADING,
  GET_RECIPES,
  GET_DETAIL_RECIPE,
  CLEAR_RECIPE,
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
} from "../actions/types";

const initialState = {
  is_loading: false,
  recipes: null,
  detailRecipe: null,
  likedRecipe: null,
  getproducts: [],
  getproduct: "",
  img_list: [],
  getcart_list: [],
  // getcart_list: [],
  getpayment_data:{},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECIPE_LOADING:
      return {
        ...state,
        is_loading: true,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        is_loading: false,
        getproducts: action.payload,
      };
    case GET_PRODUCT:  //console.log(action.payload,"action_payload")
      return {
        ...state,
        is_loading: false,
        getproduct: action.payload,
        img_list: action.payload.images,
      };
    case GET_Cartlist:sessionStorage.setItem(
      "cartlist_session",
      JSON.stringify(action.payload.order_items)
    ); //console.log(action.payload,"action_payload")
      return {
        ...state,
        is_loading: false,
        getcart_list: action.payload.order_items,
      };
    case GET_PAYMENT: console.log(action.payload,"action_payload_payment")
      return {
        ...state,
        is_loading: false,
        getpayment_data: action.payload,
      };
    case GET_Useraddress: //console.log(action.payload,"action_payload")
      return {
        ...state,
        is_loading: false,
        getaddress_list: action.payload,
      };

    case GET_RECIPES:
      return {
        ...state,
        is_loading: false,
        recipes: action.payload,
      };
    case GET_DETAIL_RECIPE:
      return {
        ...state,
        is_loading: false,
        detailRecipe: action.payload,
      };
    case CLEAR_RECIPE:
      return {
        ...state,
        is_loading: false,
        recipes: null,
      };
    case CREATE_RECIPE:
      return {
        ...state,
        is_loading: false,
      };
    case EDIT_RECIPE:
      return {
        ...state,
        is_loading: false,
      };
    case LIKE_RECIPE:
      return {
        ...state,
        is_loading: false,
        likedRecipe: action.payload,
      };
    case DELETE_RECIPE:
      return {
        ...state,
        is_loading: false,
      };
    case SAVE_RECIPE:
      return {
        ...state,
        is_loading: false,
      };
    default:
      return state;
  }
}
