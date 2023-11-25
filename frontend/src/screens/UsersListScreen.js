import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userDeleteAction,
  userDetailsAction,
  usersListAction,
} from "../redux/actions/userAction";
import { Button, Table } from "react-bootstrap";
import { Loader } from "../Components/Loader";
import { Message } from "../Components/Message";
import { LinkContainer } from "react-router-bootstrap";
import Swal from "sweetalert2";
import { USER_DELETE_RESET } from "../redux/constants/userConstants";
import { useNavigate, useParams } from "react-router-dom";
import Paginate from "../Components/Pagination";
import Meta from "../Components/Meta";
const UsersListScreen = () => {
  const pageNumber = useParams().pageNumber || 1;
  const dispatch = useDispatch();
  const { users, error, loading, page, pages} = useSelector(
    (state) => state.usersList
  );
  const { success } = useSelector((state) => state.userDelete);
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if ((userInfo && userInfo.isAdmin) || pageNumber) {
      dispatch(usersListAction(pageNumber));
      if (success) {
        dispatch({ type: USER_DELETE_RESET });
        Swal.fire("Deleted!", "User Deleted Successfully.", "success");
      }
    } else {
      navigate("/login");
    }
    if (error === "Session has expired Please Login First") {
      dispatch(userDetailsAction("profile"));
      navigate("/login");
    }
  }, [dispatch, success, userInfo, navigate, pageNumber, error]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userDeleteAction(id));
      }
    });
  };
  let  x=0
  return (
    <>
      <Meta title={"Users List"} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} varient={"danger"} />
      ) :users&& (
        <>
          <Table responsive striped hover bordered className="table-sm">
            <thead>
              <tr>
                <th className="text-center">S No</th>
                <th className="text-center">ID</th>
                <th className="text-center">NAME</th>
                <th className="text-center">EMAIL</th>
                <th className="text-center">ADMIN</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="text-center">{x+=1}</td>
                  <td className="text-center">{user._id}</td>
                  <td className="text-center">{user.name}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">
                    {!user.isAdmin ? (
                      <i
                        className="fa-regular fa-circle-xmark  fa-xl p-0"
                        style={{ color: "#c70000" }}
                      ></i>
                    ) : (
                      <i
                        className="fa-regular fa-circle-check fa-fade  fa-xl p-0"
                        style={{ color: "#106a22" }}
                      ></i>
                    )}
                  </td>
                  <td className="text-center">
                    <LinkContainer to={`/admin/userEdit/${user._id}`}>
                      <Button variant="light" className="btn-sm">
                        <i
                          className="fa-solid fa-pen-to-square fa-xl p-0"
                          style={{ color: "#db8000" }}
                        ></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="light"
                      onClick={() => deleteHandler(user._id)}
                      className="btn-sm"
                    >
                      <i
                        className="fa-solid fa-trash fa-xl p-0"
                        style={{ color: "#b30000" }}
                      ></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            page={page}
            pages={pages}
            isAdmin={true}
            component={"UsersListScreen"}
          />
        </>
      )}
    </>
  );
};

export default UsersListScreen;
