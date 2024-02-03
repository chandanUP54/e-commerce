import React, { useEffect, useState } from "react";
import Item from "../item/Item";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SearchProduct = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    axios
      .get(`http://localhost:8071/api/products/search?q=${searchQuery}`)
      .then((res) => {
        setResults(res.data);
      });
  }, [searchQuery]);

  console.log("length", results.length);

  return (
    <div className="new-collections">
      <h3>Search Results For: {searchQuery}</h3>

      <hr />
      {results.length ? (
        <div>
          <h5> {results.length} Products</h5>
        </div>
      ) : (
        <div>Your search returned no results. </div>
      )}
      <div className="collections">
        {results.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchProduct;
