import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getDataProduct,
  // deleteDataProduct,
} from "../../actionCreators/AdminAction";
import { useDispatch } from "react-redux";

import { Modal, Button, Alert } from "react-bootstrap";
// import { Modal, Button, Alert, TextField } from "@mui/material";

import EditProductModal from "./AdminProductEdit";
import AddProductModal from "./AdminProductAdd";
import "./../Admin.css";

const AdminProduct = (props) => {
  // const urlLocalhost = `${process.env.REACT_APP_API_URL}`;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataProduct());
  }, [dispatch]);

  // ADD MODAL FORM.
  const [showAddModal, setShowAddModal] = useState(false);
  const displayAddModal = () => {
    setShowAddModal(true);
  };
  const unDisplayAddModal = (boolean) => {
    setShowAddModal(boolean);
  };

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = props.dataProduct.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // EDIT MODAL FORM. (WHEN YOU MAKE MODAL FOR EDIT,ETC, YOU NEED TO DIVIDE THAT AS OTHER FILE.)

  // WHY? Because if you make it like delete form, CONST & CALL IT ON THE BOTTOM, THE ONCHANGE WILL NOT WORK.
  // The onchange will read the const and then when return, it will go back on the first state. We need to make it only 1 time run.
  const [showEditModal, setShowEditModal] = useState(false);
  // dataEdit = productDatas that want to be edited.
  const [dataEdit, setDataEdit] = useState({});

  const displayEditModal = (data) => {
    setDataEdit(data);
    setShowEditModal(true);
    // You can now use the entire product object as needed
    console.log("Selected Product:", data.productID);
  };

  // to send to AdminProductEdit.js = function to close modal.
  const unDisplayEditModal = (boolean) => {
    setShowEditModal(boolean);
    // supaya setiap update(edit) slalu ada perubahan pada state.
  };

  // DELETE MODAL FORM.
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // dataDelete = productDatas that want to be deleted.
  const [dataDelete, setDataDelete] = useState({});

  const displayDeleteModal = (data) => {
    setDataDelete(data);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const tokenAdmin = localStorage.getItem("token-admin");

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/products/delete/${dataDelete.productID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": tokenAdmin,
          },
        }
      );

      if (response.ok) {
        console.log("Product deleted successfully!");
        window.location.reload();
        // Perform any necessary UI updates or component re-rendering after deletion
      } else {
        console.error("Failed to delete product:", response.statusText);
        // Handle error scenarios
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
    } finally {
      setShowDeleteModal(false);
      // You might want to trigger a re-fetch of the product data after deletion
    }
  };
  const DeleteProductModal = () => {
    return (
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>
              Are you sure want to delete this product with the name of
              <span className="text-success-s2">"{dataDelete.name}"</span> ?
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // alert from add product problem
  const alert = props.alertData;

  const AlertDismissible = () => {
    const [alertShow, setAlertShow] = useState(alert.show);

    if (alertShow) {
      return (
        <Alert
          variant={alert.variant}
          // BEST PRACTICE TO HANDLE ALERT THAT WILL SHOW AGAIN AFTER WE CLOSE THE ALERT. (2 FUNCTIONS IN 1 ONCLICK)
          onClose={() => {
            setAlertShow(false);
            alert.show = false;
          }}
          dismissible
        >
          <Alert.Heading className="h6 my-0">{alert.message}</Alert.Heading>
        </Alert>
      );
    }
    return <></>;
  };

  return (
    <div className="text-center">
      <AlertDismissible />

      <div className="df ">
        <button className="btn btn-success" onClick={displayAddModal}>
          Add Product here as Admin
        </button>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Product"
          value={searchTerm}
          onChange={handleSearchChange}
          className=" my-3 search-input"
        />
      </div>

      <div className="mx-4 my-3">
        <div className="row">
          {filteredProducts.map((item, index) => {
            return (
              <div className="col-md-3 mt-4" key={index}>
                <div className="card h100">
                  <div className="card-img">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                    />
                  </div>
                  <div className="card-body sp">
                    <div>
                      <p className="font-weight-bold my-0">{item.name}</p>
                      <small className="card-text text-secondary">
                        Stock : {item.quantity}
                      </small>
                      <div className="d-flex d-row mb-3 justify-content-center">
                        <button
                          className="btn ml-3"
                          style={{
                            borderRadius: "7px",
                            backgroundColor: "#dedede",
                          }}
                        >
                          {item.productType}
                        </button>
                      </div>

                      <p>{item.description}</p>
                    </div>
                    <div className="d-flex d-row mt-4">
                      <p className="my-0 text-success-s2 font-weight-bold">
                        ${item.price}
                      </p>
                      <div className="d-flex d-row ml-auto">
                        <div
                          className={`my-0 ml-2 mr-2 tag status-${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </div>
                        <button
                          className="btn btn-warning mr-2"
                          onClick={() => displayEditModal(item)}
                        >
                          <i className="far fa-edit fa-lg"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => displayDeleteModal(item)}
                        >
                          <i className="far fa-trash-alt fa-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AddProductModal
        showAddModal={showAddModal}
        unDisplayAddModal={unDisplayAddModal}
      />
      <EditProductModal
        showEditModal={showEditModal}
        dataEdit={dataEdit}
        unDisplayEditModal={unDisplayEditModal}
      />
      <DeleteProductModal />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    alertData: state.AdminProductReducer.alert,
    dataProduct: state.AdminProductReducer.dataProduct,
  };
};

export default connect(mapStateToProps)(AdminProduct);
