import React, { useContext } from "react";
import "./Popular.css";
import Item from "../item/Item";
import { ShopContext } from "../../contexts/ShopContext";
const Popular = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
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
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Popular;
