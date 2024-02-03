import React, { useContext } from "react";
import "./RelatedProduct.css";
import Item from "../item/Item";
import { ShopContext } from "../../contexts/ShopContext";
const RelatedProduct = (props) => {
  const { all_product } = useContext(ShopContext);
  const maxItemsToShow = 4; // 4 items will be showns in related product
  let matchedItemsCount = 0;
  return (
    <div className="related-products">
      <h1>Related Products</h1>
      <hr />
      <div className="related-products-item">
        {all_product.map((item, i) => {
          if (
            matchedItemsCount < maxItemsToShow &&
            props.category === item.category
          ) {
            matchedItemsCount++;
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

export default RelatedProduct;
