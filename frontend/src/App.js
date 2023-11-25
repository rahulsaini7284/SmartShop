import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { Container } from "react-bootstrap";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/paymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UsersListScreen from "./screens/UsersListScreen";
import EditUserScreen from "./screens/EditUser";
import ProductsListScreen from "./screens/ProductListScreen";
import ProductUpdateScreen from "./screens/ProductUpdateScreen";
import OrdersListScreen from "./screens/OrdersListScreen";


const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container className="py-3">
          <Routes>
            <Route path="/" Component={HomeScreen} />
            <Route path="/search/:keyword" Component={HomeScreen} exact />
            <Route path="/page/:pageNumber" Component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              Component={HomeScreen}
              exact
            />
            <Route path="/login" Component={LoginScreen} />
            <Route path="/product/:id" Component={ProductScreen} exact />
            <Route
              path="/admin/usersList/:pageNumber"
              Component={UsersListScreen}
              exact
            />
            <Route path="/admin/usersList" Component={UsersListScreen} exact />
            <Route
              path="/admin/productsList/:pageNumber"
              Component={ProductsListScreen}
              exact
            />
            <Route path="/admin/productsList" Component={ProductsListScreen} />
            <Route path="/admin/ordersList" Component={OrdersListScreen} />
            <Route
              path="/admin/ordersList/:pageNumber"
              Component={OrdersListScreen}
              exact
            />
            <Route path="/admin/userEdit/:id" Component={EditUserScreen} />
            <Route
              path="/admin/productEdit/:id/edit"
              Component={ProductUpdateScreen}
            />
            <Route
              path="/admin/createProduct"
              Component={ProductUpdateScreen}
              exact
            />
            <Route path="/order/:id" Component={OrderScreen} />
            <Route path="/profile" Component={ProfileScreen} />
            <Route path="/payment" Component={PaymentScreen} />
            <Route path="/placeOrder" Component={PlaceOrderScreen} />
            <Route path="/register" Component={RegisterScreen} />
            <Route path="/Shipping" Component={ShippingScreen} />
            <Route path="/cart/:id" Component={CartScreen} />
            <Route path="/cart" Component={CartScreen} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
