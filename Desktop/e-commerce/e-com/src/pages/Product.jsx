
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Item from "../components/item/Item";
import './css/Product.css'
const Product = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="product-category">
      <img
        src={props.banner}
        className="product-category-banner img-fluid"
        alt=""
      />
      <div className="productcategory-products">
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

export default Product;
