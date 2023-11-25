import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  adminProductsListReducer,
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productListReducer,
  productReducer,
  productTopListedReducer,
  productUpdateReducer,
} from "./reducer/productReducer";
import { cartReducer } from "./reducer/cartReducer";
import {
  adminUserDetailsReducer,
  adminUserUpdateReducer,
  userDeleteReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  usersListReducer,
} from "./reducer/userReducer";
import {
  adminOrdersListReducer,
  createOrderReducer,
  getOrderDetailsReducer,
  myOrdersListReducer,
  orderDeliverReducer,
  orderPayReducer,
} from "./reducer/orderReducer";

const reducer = combineReducers({
  productList: productListReducer,
  product: productReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateProfileReducer,
  createOrder: createOrderReducer,
  orderDetails: getOrderDetailsReducer,
  orderPay: orderPayReducer,
  myOrders: myOrdersListReducer,
  usersList: usersListReducer,
  userDelete: userDeleteReducer,
  adminUserDetails: adminUserDetailsReducer,
  adminUserUpdate: adminUserUpdateReducer,
  productDelete: productDeleteReducer,
  adminOrdersList: adminOrdersListReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  orderDeliver: orderDeliverReducer,
  productCreateReview: productCreateReviewReducer,
  productTopListed: productTopListedReducer,
  adminProductsList: adminProductsListReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const saveShippingAddress = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const savePaymentMethod = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};
const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: saveShippingAddress,
    paymentMethod: savePaymentMethod,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
