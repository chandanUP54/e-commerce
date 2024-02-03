import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./AddProduct.css";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const AddProduct = () => {
  const jwtToken = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  const [product, setProduct] = useState({
    name: "",
    description: "",
    old_price: "",
    discount: "",
    new_price: "",
    quantity: "",
    brand: "",
    color: "",
    imageUrl: "",
    category: "",
    size: [
      { name: "S", quantity: "" },
      { name: "M", quantity: "" },
      { name: "L", quantity: "" },
      { name: "XL", quantity: "" },
      { name: "XXL", quantity: "" },
    ],
    extraImageUrls: [
      { name: "Image 1", imageUrl: "" },
      { name: "Image 2", imageUrl: "" },
      { name: "Image 3", imageUrl: "" },
    ],
  });

  const handleChange = (e, field, index, subField) => {
    const { name, value } = e.target;
    const updatedField = [...product[field]];
    updatedField[index][subField] = value;

    setProduct({
      ...product,
      [field]: updatedField,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product_post = await axios.post(
      `https://bored-quiver-production.up.railway.app/api/v1/admin/products/`,
      product,
      config
    );
    swal("Product Saved", "Add Another Product");
    setProduct({
      name: "",
      description: "",
      old_price: "",
      discount: "",
      new_price: "",
      quantity: "",
      brand: "",
      color: "",
      imageUrl: "",
      category: "",
      size: [
        { name: "S", quantity: "" },
        { name: "M", quantity: "" },
        { name: "L", quantity: "" },
        { name: "XL", quantity: "" },
        { name: "XXL", quantity: "" },
      ],
      extraImageUrls: [
        { name: "Image 1", imageUrl: "" },
        { name: "Image 2", imageUrl: "" },
        { name: "Image 3", imageUrl: "" },
      ],
    });
    console.log("product", product_post);
  };

  return (
    <div className="add-product">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={product.name}
            // onChange={(e) => handleChange(e)}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image URL"
              name="imageUrl"
              value={product.imageUrl}
              // onChange={(e) => handleChange(e)}
              onChange={(e) =>
                setProduct({ ...product, imageUrl: e.target.value })
              }
              required
            />
          </Form.Group>
        </Row>

        {/* extraImage Url */}
        <Row className="mb-3">
          {product.extraImageUrls.map((image, index) => (
            
              <Form.Group  md={4} key={`image${index + 1}`} className="mb-3">
                <Form.Label>Image {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Image Name"
                  value={image.name}
                  onChange={(e) =>
                    handleChange(e, "extraImageUrls", index, "name")
                  }
                />
                <Form.Label className="mt-2">Image {index + 1} URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Image URL"
                  value={image.imageUrl}
                  onChange={(e) =>
                    handleChange(e, "extraImageUrls", index, "imageUrl")
                  }
                />
              </Form.Group>
            
          ))}
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="Color"
              name="color"
              value={product.color}
              // onChange={(e) => handleChange(e)}
              onChange={(e) =>
                setProduct({ ...product, color: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Brand"
              name="brand"
              value={product.brand}
              // onChange={(e) => handleChange(e)}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="quantity"
              name="quantity"
              value={product.quantity}
              // onChange={(e) => handleChange(e)}
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
              required
            />
          </Form.Group>
        </Row>

        <Form.Group controlId="formBasicSelect" className="mb-4">
          <Form.Label>Select Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={product.category}
            name="category"
            required
            // onChange={(e) => handleChange(e)}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Popular In Women">Popular In Women</option>
            <option value="New Collection">New Collection</option>
          </Form.Select>
        </Form.Group>

        {/* size */}
        <Row>
          {product.size.map((size, index) => (
            <Col md={4} key={`size${index + 1}`} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Size {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Size Name"
                  value={size.name}
                  onChange={(e) => handleChange(e, "size", index, "name")}
                />
                <Form.Control
                  type="number"
                  placeholder="Quantity"
                  value={size.quantity}
                  onChange={(e) => handleChange(e, "size", index, "quantity")}
                />
              </Form.Group>
            </Col>
          ))}
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Old Price</Form.Label>
            <Form.Control
              type="number"
              name="old_price"
              placeholder="Old Price"
              value={product.old_price}
              // onChange={(e) => handleChange(e)}
              onChange={(e) =>
                setProduct({ ...product, old_price: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>New Price</Form.Label>
            <Form.Control
              type="number"
              name="new_price"
              placeholder="New Price"
              value={product.new_price}
              // onChange={(e) => handleChange(e)}
              onChange={(e) =>
                setProduct({ ...product, new_price: e.target.value })
              }
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="description"
            as="textarea"
            rows={2}
            name="description"
            value={product.description}
            // onChange={(e) => handleChange(e)}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
