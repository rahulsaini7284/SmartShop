import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({
  page,
  pages,
  isAdmin = false,
  keyword = "",
  component,
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => (
          <LinkContainer
            key={p + 1}
            to={
              component === "HomeScreen"
                ? !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${p + 1}`
                    : `/page/${p + 1}`
                  : `/admin/productsList/${p + 1}`
                : component === "UsersListScreen"
                ? `/admin/usersList/${p + 1}`
                : component === "OrdersListScreen" &&
                  `/admin/ordersList/${p + 1}`
            }
          >
            <Pagination.Item activeLabel="" active={p + 1 === page}>
              {p + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
