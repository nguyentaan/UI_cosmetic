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
    productType: "",
  });

  const handleAddInputChange = (event) => {
    setDataAddInput({
      ...dataAddInput,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  // const selectFile = (event) => {
  //   setDataAddInput({
  //     ...dataAddInput,
  //     [event.currentTarget.name]: event.target.files[0],
  //   });
  //   setSelectedFileName(event.target.files[0].name);
  // };

  const closeAddModal = () => {
    props.unDisplayAddModal(false);
  };

  //  Form Edit Data = for image inputs, we use form data in Insomnia. So here we are.
  const FormAddData = new FormData();
  FormAddData.append("image", dataAddInput.image);
  FormAddData.append("name", dataAddInput.name);
  FormAddData.append("price", dataAddInput.price);
  FormAddData.append("description", dataAddInput.description);
  FormAddData.append("quantity", dataAddInput.quantity);
  FormAddData.append("productType", dataAddInput.productType);

  const handleSubmitAdd = (event) => {
    event.preventDefault();
    props.addDataProduct(FormAddData, dataAddInput);
    setDataAddInput({
      image: null,
      name: "",
      price: "",
      description: "",
      quantity: "",
      productType: "",
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
