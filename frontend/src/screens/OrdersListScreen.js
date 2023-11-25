import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { Loader } from "../Components/Loader";
import { Message } from "../Components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { adminOrdersListAction } from "../redux/actions/orderesActions";
import Paginate from "../Components/Pagination";
import {
  userDetailsAction,
  userLoginResetAction,
} from "../redux/actions/userAction";
import Meta from "../Components/Meta";

const OrdersListScreen = () => {
  const navigate = useNavigate();
  const pageNumber = useParams().pageNumber || 1;
  const dispatch = useDispatch();
  const { ordersList, error, loading, page, pages } = useSelector(
    (state) => state.adminOrdersList
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(adminOrdersListAction(pageNumber));
    } else {
      navigate("/login");
    }
    if (error === "Session has expired Please Login First") {
      dispatch(userDetailsAction("profile"));
      dispatch(userLoginResetAction());
    }
  }, [dispatch, userInfo, navigate, pageNumber, error]);
  let x=0;

  return (
    <>
      <Meta title={"Orders List"} />
      <h2>Orders List</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} varient={"danger"} />
      ) : ordersList&&(
        <>
          <Table responsive striped hover bordered className="table-sm">
            <thead>
              <tr>
                <th className="text-center">S NO</th>
                <th className="text-center">ID</th>
                <th className="text-center">USER</th>
                <th className="text-center">DATE</th>
                <th className="text-center">TOTAL</th>
                <th className="text-center">PAID</th>
                <th className="text-center">DELIVERED</th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order) => (
                <tr key={order._id}>
                  <td className="text-center">{x+=1}</td>
                  <td className="text-center">{order._id}</td>
                  <td className="text-center">
                    {order.user && order.user.name}
                  </td>
                  <td className="text-center">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="text-center">{order.totalPrice}</td>
                  <td className="text-center">
                    {" "}
                    {!order.paidAt ? (
                      <i
                        className="fa-regular fa-circle-xmark  fa-xl "
                        style={{ color: "#c70000" }}
                      ></i>
                    ) : (
                      order.paidAt.substring(0, 10)
                    )}
                  </td>
                  <td className="text-center">
                    {" "}
                    {!order.deliveredAt ? (
                      <i
                        className="fa-regular fa-circle-xmark  fa-xl "
                        style={{ color: "#c70000" }}
                      ></i>
                    ) : (
                      order.deliveredAt.substring(0, 10)
                    )}
                  </td>

                  <td className="text-center">
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        <i
                          className="fa-solid fa-circle-info fa-2xl"
                          style={{ color: "#e07800" }}
                        ></i>
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} component={"OrdersListScreen"} />
        </>
      )}
    </>
  );
};

export default OrdersListScreen;
