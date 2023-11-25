import {
  ADD_NEW_ORDER_FAIL,
  ADD_NEW_ORDER_REQUEST,
  ADD_NEW_ORDER_RESET,
  ADD_NEW_ORDER_SUCCESS,
  ADMIN_ORDERS_LIST_FAIL,
  ADMIN_ORDERS_LIST_REQUEST,
  ADMIN_ORDERS_LIST_RESET,
  ADMIN_ORDERS_LIST_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_RESET,
  GET_ORDER_DETAILS_SUCCESS,
  MY_ORDERS_LIST_FAIL,
  MY_ORDERS_LIST_REQUEST,
  MY_ORDERS_LIST_RESET,
  MY_ORDERS_LIST_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_ORDER_REQUEST:
      return { loading: true };
    case ADD_NEW_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ADD_NEW_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case ADD_NEW_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const getOrderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST:
      return { loading: true };
    case GET_ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case GET_ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ORDER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true, updatedOrder: action.payload };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true, updatedOrder: action.payload };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
export const myOrdersListReducer = (state = { myOrdersList: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_LIST_REQUEST:
      return { loading: true };
    case MY_ORDERS_LIST_SUCCESS:
      return { loading: false, myOrdersList: action.payload };
    case MY_ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MY_ORDERS_LIST_RESET:
      return { myOrdersList: [] };
    default:
      return state;
  }
};
export const adminOrdersListReducer = (state = { ordersList: [] }, action) => {
  switch (action.type) {
    case ADMIN_ORDERS_LIST_REQUEST:
      return { loading: true };
    case ADMIN_ORDERS_LIST_SUCCESS:
      return {
        loading: false,
        ordersList: action.payload.orders,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
      };
    case ADMIN_ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_ORDERS_LIST_RESET:
      return { ordersList: [] };
    default:
      return state;
  }
};
