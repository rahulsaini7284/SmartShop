import {
  ADMIN_ORDERS_LIST_RESET,
  GET_ORDER_DETAILS_RESET,
  MY_ORDERS_LIST_RESET,
} from "../constants/orderConstants";
import {
  ADMIN_USER_DETAILS_FAIL,
  ADMIN_USER_DETAILS_REQUEST,
  ADMIN_USER_DETAILS_RESET,
  ADMIN_USER_DETAILS_SUCCESS,
  ADMIN_USER_UPDATE_FAIL,
  ADMIN_USER_UPDATE_REQUEST,
  ADMIN_USER_UPDATE_SUCCESS,
  USERS_LIST_FAIL,
  USERS_LIST_REQUEST,
  USERS_LIST_RESET,
  USERS_LIST_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_LIST_BY_ADMIN_RESET,
} from "../constants/productConstants";
import axios from "axios";

export const userLoginAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userRegisterAction =
  ({ email, password, name }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const { data } = await axios.post("/api/users", {
        email,
        password,
        name,
      });
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdateProfileAction =
  ({ email, name, password }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/updateProfile`,
        {
          name,
          email,
          password,
        },
        config
      );
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const usersListAction = (pageNumber) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/users/admin/users?pageNumber=${pageNumber}`,
      config
    );
    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//ADMIN----
export const userDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/admin/${id}`, config);
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminUserDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_USER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/admin/${id}`, config);
    dispatch({
      type: ADMIN_USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const adminUserUpdateAction =
  (id, DATA) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_USER_UPDATE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/admin/${id}`,
        DATA,
        config
      );
      dispatch({
        type: ADMIN_USER_UPDATE_SUCCESS,
      });
      dispatch({ type: ADMIN_USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADMIN_USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userLogoutAction = () => (dispatch) => {
  document.location.href = "/login";
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch(userLoginResetAction());
};
export const userLoginResetAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGIN_RESET });
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
  dispatch({ type: USERS_LIST_RESET });
  dispatch({ type: ADMIN_USER_DETAILS_RESET });
  dispatch({ type: PRODUCT_LIST_BY_ADMIN_RESET });
  dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
  dispatch({ type: GET_ORDER_DETAILS_RESET });
  dispatch({ type: MY_ORDERS_LIST_RESET });
  dispatch({ type: ADMIN_ORDERS_LIST_RESET });
};
