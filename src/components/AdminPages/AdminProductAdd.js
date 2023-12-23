import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import { addDataProduct } from "../../actionCreators/AdminAction";

const AdminProductAdd = (props) => {
  const [dataAddInput, setDataAddInput] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
    quantity: "",
    productType: "Face",
  });

  const handleAddInputChange = (event) => {
    setDataAddInput({
      ...dataAddInput,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const closeAddModal = () => {
    props.unDisplayAddModal(false);
  };

  const addProduct = async (productData) => {
    try {
      const response = await fetch("http://localhost:8081/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log("Product added successfully!");
        window.location.reload();
        // Handle any additional logic after a successful API call
      } else {
        console.error("Failed to add product:", response.statusText);
        // Handle error scenarios
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      // Handle error scenarios
    }
  };

  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    console.log(dataAddInput);
    // props.addDataProduct(dataAddInput);
    await addProduct(dataAddInput);
    setDataAddInput({
      image: "",
      name: "",
      price: "",
      description: "",
      quantity: "",
      productType: "Face",
    });
    props.unDisplayAddModal(false);
  };

  return (
    <Modal show={props.showAddModal} onHide={closeAddModal}>
      <form onSubmit={handleSubmitAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                onChange={handleAddInputChange}
              />
            </div>
            <div className="d-flex d-row">
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  name="price"
                  onChange={handleAddInputChange}
                />
              </div>
              {/* Stock(Frontend) = Quantity(Backend) */}
              <div className="form-group ml-3">
                <label htmlFor="quantity">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Stock"
                  name="quantity"
                  onChange={handleAddInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Choose Image</label>
              <div className="custom-file">
                <input
                  name="image"
                  type="url"
                  accept="image/*"
                  className="form-control"
                  placeholder="Image's url"
                  onChange={handleAddInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                rows="3"
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                onChange={handleAddInputChange}
              />
            </div>
            <div className="d-flex d-row">
              <div className="form-group ml-3 w-100">
                <label htmlFor="product-type">Select Product Type</label>
                <select
                  className="form-control"
                  name="productType"
                  onChange={handleAddInputChange}
                >
                  <option value="Face">Face</option>
                  <option value="Eyes">Eyes</option>
                  <option value="Lips">Lips</option>
                  <option value="Shanving Needs">Shanving Needs</option>
                  <option value="Facial Care">Facial Care</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Close
          </Button>
          <Button type="submit" variant="success">
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

const mapDispatchToProps = {
  addDataProduct,
};

export default connect(null, mapDispatchToProps)(AdminProductAdd);
