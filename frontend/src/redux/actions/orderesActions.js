import axios from "axios";
import {
  ADD_NEW_ORDER_FAIL,
  ADD_NEW_ORDER_REQUEST,
  ADD_NEW_ORDER_SUCCESS,
  ADMIN_ORDERS_LIST_FAIL,
  ADMIN_ORDERS_LIST_REQUEST,
  ADMIN_ORDERS_LIST_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  MY_ORDERS_LIST_FAIL,
  MY_ORDERS_LIST_REQUEST,
  MY_ORDERS_LIST_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";


export const addNewOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_NEW_ORDER_REQUEST,
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

    const { data } = await axios.post("/api/orders", order, config);
    if (data) {
      dispatch({
        type: ADD_NEW_ORDER_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_NEW_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST,
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
    const { data } = await axios.get(`/api/orders/${id}`, config);
    if (data) {
      dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderPayAction =
  (id, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
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
        `/api/orders/${id}/pay`,
        paymentResult,
        config
      );
      if (data) {
        dispatch({
          type: ORDER_PAY_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const orderDeliverAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );
    if (data) {
      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const myOrdersListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_ORDERS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myOrders`, config);
    if (data) {
      dispatch({
        type: MY_ORDERS_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: MY_ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const adminOrdersListAction =
  (pageNumber) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_ORDERS_LIST_REQUEST,
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
        `/api/orders?pageNumber=${pageNumber}`,
        config
      );
      if (data) {
        dispatch({
          type: ADMIN_ORDERS_LIST_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: ADMIN_ORDERS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
