import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import Footer from "./Footer";
import "../Users.css";
import axios from "axios";
import ProductsOrder from "./ProductsOrder";

import { userLogout } from "../../actionCreators/LoginAction";

const UserOrders = (props) => {
  const [userID, setUserID] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const decoded = JSON.parse(atob(base64));
      return decoded;
    } catch (e) {
      console.error("Error parsing JWT:", e);
      return null;
    }
  };

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token-user");

    if (token) {
      // Parse the token to get the user ID
      const userData = parseJwt(token);

      if (userData && userData.userID) {
        // Set the userID in the component state
        setUserID(userData.userID);

        // Save the userID to localStorage
        localStorage.setItem("userID", userData.userID);
      }
    }
    console.log("userID:", userID);
  }, [userID]);

  // Usage
  if (localStorage.getItem("token-user")) {
    var userData = parseJwt(localStorage.getItem("token-user"));
    // Now userData contains the decoded JWT payload
  }

  const Logout = () => {
    props.userLogout();
  };

  const [orders, setOrders] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/orders/getOrderByUserID/${userID}`
      );
      const responseData = response.data.data;
      setOrders(responseData);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };
  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  const cancelOrder = async (order) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/orders/edit/${order.orderID}`,
        {
          firstName: order.firstName,
          lastName: order.lastName,
          email: order.email,
          country: order.country,
          city: order.city,
          address: order.address,
          phoneNumber: order.phoneNumber,
          postalCode: order.postalCode,
          userID: order.userID,
          status: "Cancelled",
          totalPrice: order.totalPrice,
          pMethod: order.pMethod,
          shippingCost: order.shippingCost,
        }
      );

      if (response.status === 200) {
        // Refresh the order list after successful cancellation
        fetchOrder();
        console.log("Order cancelled successfully");
      } else {
        console.error("Error cancelling order:", response.data.message);
      }
    } catch (error) {
      console.error("Error cancelling order:", error.message);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    const status = order.status.toLowerCase();
    return status.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="user-orders-container">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} className="logo-fx" alt="..." />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {props.tokenUser ? (
                <Link to="/cart" style={{ textDecoration: "none" }}>
                  <li className="nav-item">
                    <button className="btn btn-success d-flex d-row">
                      <i className="fas fa-shopping-cart align-self-center mr-2" />
                      <p className="my-0">Cart : {props.dataCart.length}</p>
                    </button>
                  </li>
                </Link>
              ) : (
                <li className="nav-item">
                  <button className="btn btn-secondary d-flex d-row">
                    <i className="fas fa-shopping-cart align-self-center mr-2" />
                    <p className="my-0">Cart </p>
                  </button>
                </li>
              )}

              <li className="nav-item mx-4">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-success dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {userData ? `Hello, ${userData.username}` : "Hello"}
                  </button>
                  <div className="dropdown-menu t45">
                    <Link to="/orders">
                      <button className="dropdown-item text-success">
                        Your Orders <i className="fas fa-shopping-cart"></i>
                      </button>
                    </Link>
                    <button
                      className="dropdown-item text-danger"
                      onClick={Logout}
                    >
                      Logout <i className="fas fa-sign-out-alt"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="orders-container">
        <input
          type="text"
          placeholder="Search by Status"
          value={searchTerm}
          onChange={handleSearchChange}
          className="my-3 search-input form-control"
        />

        {filteredOrders.map((order, index) => {
          const statusClass =
            order.status === "Draft"
              ? "draft-status"
              : order.status === "Confirmed"
              ? "confirmed-status"
              : order.status === "Processing"
              ? "processing-status"
              : order.status === "Shipping"
              ? "shipping-status"
              : order.status === "Delivered"
              ? "delivered-status"
              : order.status === "Paid"
              ? "paid-status"
              : order.status === "Cancelled"
              ? "cancelled-status"
              : "";
          return (
            <div className={`order-card ${statusClass}`} key={index}>
              <div className="header-card">
                <h2 className={`status font-weight-bold ${statusClass}`}>
                  {order.status}
                </h2>
                {order.status === "Confirmed" && (
                  <button
                    className="cancel-button"
                    onClick={() => cancelOrder(order)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
              <ProductsOrder order={order} />
              <div className="footer-card">
                <div className="df1">
                  <div className="font-weight-bold mr-2">Payment: </div>
                  <p className="my-0">{order.pMethod}</p>
                </div>
                <div className="df1-container">
                  <div className="df1">
                    <div className="font-weight-bold mr-2">Shipping: </div>
                    <p className="my-0">${order.shippingCost}</p>
                  </div>
                  <div className="df1">
                    <div className="font-weight-bold mr-2">TOTAL: </div>
                    <p className="my-0">${order.totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tokenUser: state.LoginReducer.tokenUser,
    dataCart: state.UserReducer.dataCart,
  };
};

const mapDispatchToProps = {
  userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);
