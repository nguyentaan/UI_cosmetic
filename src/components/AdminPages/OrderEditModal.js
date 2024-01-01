import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const OrderEditModal = (props) => {
  const [editedOrder, setEditedOrder] = useState({});

  useEffect(() => {
    // Set the initial state when the modal is opened
    setEditedOrder({ ...props.order });
  }, [props.order]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8081/orders/edit/${editedOrder.orderID}`,
        editedOrder
      );

      if (response.status === 200) {
        // Refresh the order details after successful update
        props.fetchOrderDetails();
        console.log("Order updated successfully");
      } else {
        console.error("Error updating order:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating order:", error.message);
    } finally {
      window.location.reload();
      closeCheckoutModal();
    }
  };

  const closeCheckoutModal = () => {
    props.unDisplayCheckoutModal(false);
  };

  return (
    <Modal size="lg" show={props.showEditModal} onHide={closeCheckoutModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Order</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "2rem 4rem" }}>
        <div style={{ fontFamily: "Karla,sans-serif" }}>
          <div>
            <table className="table">
              <thead style={{ backgroundColor: "#009e7f", color: "white" }}>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Firstname:</td>
                  <td>
                    <input
                      type="text"
                      name="firstName"
                      value={editedOrder.firstName || ""}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Lastname:</td>
                  <td>
                    <input
                      type="text"
                      name="lastName"
                      value={editedOrder.lastName || ""}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Email:</td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      value={editedOrder.email || ""}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Phone Number:</td>
                  <td>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={editedOrder.phoneNumber || ""}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Address:</td>
                  <td>
                    <b>
                      <input
                        type="text"
                        name="address"
                        value={editedOrder.address || ""}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>City:</td>
                  <td>
                    <b>
                      <input
                        type="text"
                        name="city"
                        value={editedOrder.city || ""}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Country:</td>
                  <td>
                    <b>
                      <input
                        type="text"
                        name="country"
                        value={editedOrder.country || ""}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </b>
                  </td>
                </tr>
                {/* <tr>
                  <th scope="row">6</th>
                  <td className="checkout-modal-td">Product:</td>
                  <td>
                    {products.map((item, index) => {
                      return (
                        <div className="d-flex d-row" key={index}>
                          <div className="col-md-9 px-0">
                            <p className="text-success-s2 mb-0 mt-1">
                              {item.name}
                              <span className="text-secondary font-weight-bold ml-2">
                                × {item.orderQuantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </td>
                </tr> */}
                <tr>
                  <th scope="row">7</th>
                  <td>Postal Code:</td>
                  <td>
                    <input
                      type="text"
                      name="postalCode"
                      value={editedOrder.postalCode || ""}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Payment:</td>
                  <td>
                    <select
                      className="form-control"
                      name="status"
                      value={editedOrder.pMethod}
                      onChange={handleInputChange}
                    >
                      <option value="Cash On Delivery">Cash On Delivery</option>
                      <option value="Direct Bank Transfer">
                        Direct Bank Transfer
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td>Status:</td>
                  <td>
                    <select
                      className="form-control"
                      name="status"
                      value={editedOrder.status}
                      onChange={handleInputChange}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Paid">Paid</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="mt-4 mb-2"
            style={{ borderTop: "2px solid #009e7f" }}
          />
        </div>
        <div className="mt-4">
          <Button variant="success" onClick={saveChanges}>
            Save Changes
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderEditModal;
