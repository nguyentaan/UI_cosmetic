import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";

import { editDataProduct } from "../../actionCreators/AdminAction";

const AdminProductEdit = (props) => {
  const [dataEditInput, setDataEditInput] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
    quantity: "",
    productType: "",
  });

  useEffect(() => {
    setDataEditInput({
      image: props.dataEdit.image || "",
      name: props.dataEdit.name || "",
      price: props.dataEdit.price || "",
      description: props.dataEdit.description || "",
      quantity: props.dataEdit.quantity || "",
      productType: props.dataEdit.productType || "",
    });
  }, [props.dataEdit]);

  const handleEditInputChange = (event) => {
    setDataEditInput({
      ...dataEditInput,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const closeEditModal = () => {
    props.unDisplayEditModal(false);
  };

  //  Form Edit Data = for image inputs, we use form data in Insomnia. So here we are.
  const FormEditData = new FormData();
  FormEditData.append("image", dataEditInput.image);
  FormEditData.append("name", dataEditInput.name);
  FormEditData.append("price", dataEditInput.price);
  FormEditData.append("description", dataEditInput.description);
  FormEditData.append("quantity", dataEditInput.quantity);
  FormEditData.append("productType", dataEditInput.productType);

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    props.editDataProduct(FormEditData, props.dataEdit, dataEditInput);
    props.unDisplayEditModal(false);
  };

  return (
    <Modal show={props.showEditModal} onHide={closeEditModal}>
      <form onSubmit={handleSubmitEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product of {props.dataEdit.name}</Modal.Title>
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
                value={dataEditInput.name}
                onChange={handleEditInputChange}
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
                  value={dataEditInput.price}
                  onChange={handleEditInputChange}
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
                  value={dataEditInput.quantity}
                  onChange={handleEditInputChange}
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
                  value={dataEditInput.image}
                  onChange={handleEditInputChange}
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
                value={dataEditInput.description}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="d-flex d-row">
              <div className="form-group ml-3 w-100">
                <label htmlFor="product-type">Select Product Type</label>
                <select
                  className="form-control"
                  name="productType"
                  value={dataEditInput.productType}
                  onChange={handleEditInputChange}
                >
                  <option value="Face">Face</option>
                  <option value="Eyes">Eyes</option>
                  <option value="Lips">Lips</option>
                  <option value="Shanving Needs">Shaving Needs</option>
                  <option value="Facial Care">Facial Care</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button type="submit" variant="warning">
            Edit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
const mapDispatchToProps = {
  editDataProduct,
};

export default connect(null, mapDispatchToProps)(AdminProductEdit);
