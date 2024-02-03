import axios from "axios";
import React, { useEffect, useState } from "react";

const AllProduct = ({ category }) => {
  const [product, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8071/api/products?category=${category}`)

      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {product.map((e, num) => (
        <div key={num}>
          <p>{e.category}</p>
        </div>
      ))}
    </div>
  );
};

export default AllProduct;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const AllProduct = ({ category }) => {
//   const [product, setProducts] = useState([]);
//   const jwtToken = localStorage.getItem("jwt");

//   const config = {
//     headers: {
//       Authorization: `Bearer ${jwtToken}`,
//     },
//   };
//   useEffect(() => {

//     axios
//       .get(`http://localhost:8071/api/v1/admin/products/all`,config)
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div>
//       {product.map((e, num) => (
//         <div key={num}>
//           <p>{e.title}</p>
//           <p>{e.category}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllProduct;
