import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

import axios from "axios";
import swal from "sweetalert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const Customers = () => {
  const [customers, setCustomers] = useState([]);
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

  useEffect(() => {
    axios
      .get(`https://bored-quiver-production.up.railway.app/api/v1/admin/orders/allUsers`, config)
      .then((response) => {
        console.log(response);
        console.log("customers", response.data);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setCurrentPage(page ? parseInt(page, 10) : 1);
  }, [location.pathname, page]);

  const customersPerPage = 10;

  const indexOfLastProduct = currentPage * customersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/admin/customers/${pageNumber}`);
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

  const totalPages = Math.ceil(customers.length / customersPerPage);

  return (
    <div className="container  mt-4">
      <h2>Customers</h2>

      <table className="table mt-5">
        <thead className="bg-light">
          <tr>
            <th scope="col">UserId</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>

        <tbody>
          {currentCustomers.map((e, num) => (
            <tr>
              <td>{e.userId}</td>
              <td>
                <img
                  style={{ width: "45px", height: "45px", borderRadius: "50%",border:"2px solid black" }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuq6qw8AlEHXeG643B8K8_9ycd03yPRXMxfoGdwn4-74-NbLIRML3h&usqp=CAE&s"
                  alt=""
                />
              </td>
              <td>
                {e.firstName} {e.lastName}
              </td>
              <td>{e.email}</td>
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

export default Customers;
