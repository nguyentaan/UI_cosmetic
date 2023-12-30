import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Modal } from "react-bootstrap";
import axios from "axios";

const OrderDetaislModal = (props) => {
  const closeCheckoutModal = () => {
    props.unDisplayCheckoutModal(false);
  };

  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);

  console.log("selected order", props.order);
  const orderid = props.order;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/orders/getOrder/${orderid}`
        );
        const responseData = response.data.data;
        setOrder(responseData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrder();
  }, [orderid]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/orders/getOrderDetaiLs/${orderid}`
        );
        const responseData = response.data.data;
        setProducts(responseData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, [orderid]);

  console.log(products);

  return (
    <Modal size="lg" show={props.showOrderModal} onHide={closeCheckoutModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <img src={logo} alt="..." style={{ width: "25%" }} />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "2rem 4rem" }}>
        <div style={{ fontFamily: "Karla,sans-serif" }}>
          <div>
            <h5 className="font-weight-bold text-success-s2 mb-3">
              ORDER DETAILS
            </h5>
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
                  <th scope="row">0</th>
                  <td>OrderID:</td>
                  <td>
                    <b>{orderid}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>Firstname:</td>
                  <td>
                    <b>{order.firstName}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Lastname:</td>
                  <td>
                    <b>{order.lastName}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Phone Number:</td>
                  <td>
                    <b>{order.phoneNumber}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Location:</td>
                  <td>
                    <b>
                      {order.address}, {order.city}, {order.country}
                    </b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td className="checkout-modal-td">Product:</td>
                  <td>
                    {products.map((item, index) => {
                      return (
                        <div className="d-flex d-row" key={index}>
                          <div className="col-md-9 px-0">
                            <p className="text-success-s2 mb-0 mt-1">
                              {item.productID}
                              <span className="text-secondary font-weight-bold ml-2">
                                × {item.orderQuantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Postal Code:</td>
                  <td>
                    <b>{order.postalCode}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Status:</td>
                  <td>
                    <b>{order.status}</b>
                  </td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td
                    className="font-weight-bold"
                    style={{ fontSize: "1.1rem" }}
                  >
                    Total:
                  </td>
                  <td style={{ fontSize: "1.1rem" }}>
                    <b className="text-success-s2">${order.totalPrice}</b>
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
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetaislModal;
