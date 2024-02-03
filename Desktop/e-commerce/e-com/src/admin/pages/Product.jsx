import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./Product.css";
import swal from "sweetalert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const Product = () => {
  const productsPerPage = 10; 
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { page } = useParams();

  console.log("page",page);
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page, 10) : 1);
 // const [currentPage, setCurrentPage] = useState(1);
  const jwtToken = localStorage.getItem("jwt");

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8071/api/v1/admin/products/all`, config)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setCurrentPage(page ? parseInt(page, 10) : 1);

  }, [location.pathname, page]);

  const handleStatusChange = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8071/api/v1/admin/products/${id}/delete`,
        config
      );
      // window.location.reload();
      // alert("Status Updated in Backend")
      swal("Status Updated From Backend", `Product Deleted`);
    } catch (error) {
      console.error("Error deleting Product:", error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/admin/product/${pageNumber}`);
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

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="product-container mt-4">
      <h2>Product List</h2>
      <table className="table mt-5">
        <thead className="bg-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Old Price</th>
            <th scope="col">New Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        <tbody>
          {currentProducts.reverse().map((e, num) => (
            <tr>
              <td>
                <img src={e.imageUrl} alt="" />
              </td>
              <td>
                <div className="title">{e.name}</div>
              </td>
              <td>{e.old_price}</td>
              <td>{e.new_price}</td>
              <td>{e.quantity}</td>
              <td>
                <div className="delete">
                  <button onClick={() => handleStatusChange(e.id)}>
                    Delete
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

export default Product;
