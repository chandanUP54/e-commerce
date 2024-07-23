import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./Orders.css";
import axios from "axios";
import swal from "sweetalert";
import { BASE_API_URL } from "../../components/backend/user.service";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const jwtToken = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  console.log("page",page);


  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${BASE_API_URL}/api/v1/admin/orders/${orderId}`,
        { orderStatus: newStatus },
        config
      );
      // window.location.reload();

      // alert("Status Updated in Backend")
      swal("Status Updated From Backend",`Order ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/api/v1/admin/orders/`, config)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      setCurrentPage(page ? parseInt(page, 10) : 1);
  }, [location.pathname, page]);

  const ordersPerPage = 6;

  const indexOfLastProduct = currentPage * ordersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/admin/orders/${pageNumber}`);
  };

  // Generate pagination items for a specified range
  const generatePaginationItems = (start, end) => {
    return [...Array(end - start + 1).keys()].map((number) => (
      <Pagination.Item
        key={start + number}
        active={start + number === currentPage}
        onClick={() => handlePageChange(start + number)}
      >
        {start + number}
      </Pagination.Item>
    ));
  };

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="container orders-container mt-4">
      <h2>Orders</h2>

      <table className="table mt-5">
        <thead className="bg-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Order Id</th>
            <th scope="col">Status</th>
            <th scope="col">Update</th>
          </tr>
        </thead>

        <tbody>
          {currentOrders
            .slice()
            .reverse()
            .map((e, num) => (
              <tr>
                <td>
                  <div className="product-images">
                    {e.orderItems.map((product, productIndex) => (
                      <img src={product.imageUrl} alt="" />
                    ))}
                  </div>
                </td>
                <td>
                  {e.orderItems.map((product, productIndex) => (
                    <p>{product.productName}</p>
                  ))}
                </td>
                <td>{e.orderId}</td>
                <td>
                  <div className="order-status">{e.orderStatus}</div>
                </td>
                <td>
                  <div className="order-update">
                    <button
                      onClick={() => handleStatusChange(e.orderId, "CONFIRMED")}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusChange(e.orderId, "CANCELLED")}
                    >
                      Cancel
                    </button>
                    <br />
                    <button
                      onClick={() => handleStatusChange(e.orderId, "SHIPPED")}
                    >
                      Shipped
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination className="mt-4">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {currentPage > 10 && (
          <Pagination.First onClick={() => handlePageChange(1)} />
        )}
        {currentPage > 11 && <Pagination.Ellipsis disabled />}
        {totalPages <= 20
          ? generatePaginationItems(1, totalPages)
          : currentPage <= 10
          ? generatePaginationItems(1, 20)
          : generatePaginationItems(
              currentPage - 9,
              Math.min(currentPage + 10, totalPages)
            )}
        {currentPage < totalPages - 10 && <Pagination.Ellipsis disabled />}
        {currentPage < totalPages - 10 && (
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        )}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default Orders;
