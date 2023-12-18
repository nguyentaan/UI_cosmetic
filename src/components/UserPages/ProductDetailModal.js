import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import logo from "../../assets/logo.png";
import { Modal } from "react-bootstrap";

import { addItemToCart } from "../../actionCreators/UserAction";

const ProductDetailModal = (props) => {
  // const urlLocalhost = `${process.env.REACT_APP_API_URL}`;
  // To make dynamic photo displayer.
  const [Image, setImage] = useState("");

  // parameter (ID) so that useEffect would run everytime id change.
  useEffect(() => {
    setImage("");
  }, [props.dataProduct._id]);


  const inputCart = (data) => {
    props.addItemToCart(data);
  };

  const picture = (picture) => {
    // Condition to cover the undefined value of Image in row 15.
    // Assignment to constant variable = ERROR yang bakal muncul kalau kamu ganti "Var" dengan "Const"
    var pictureChecked = "";
    if (!picture) {
      pictureChecked = props.dataProduct.image;
    } else {
      pictureChecked = picture;
    }
    return {
      backgroundImage: `url(${pictureChecked})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "17rem",
    };
  };

  const closeDetailModal = () => {
    props.unDisplayDetailModal(false);
  };

  return (
    <Modal size="lg" show={props.showDetailModal} onHide={closeDetailModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <img src={logo} alt="..." style={{ width: "25%" }} />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6 px-5 py-3 align-self-center">
              <div style={picture(Image)} alt="..." className="w-100 mb-3" />


            </div>

            <div className="col-md-6 px-5 py-3 border-left">
              <div className="mb-4">
                <h3 className="font-weight-bold">{props.dataProduct.name}</h3>
                <p className="my-0 text-success-s2 font-weight-bold">
                  ${props.dataProduct.price}
                </p>
                <small className="card-text text-secondary">
                  Stock : {props.dataProduct.quantity}
                </small>
              </div>

              <div className="mb-5">
                <p className="text-secondary">
                  {props.dataProduct.description}
                </p>
              </div>

              <button
                onClick={() => inputCart(props.dataProduct)}
                className="btn btn-outline-success d-flex d-row mt-5 mb-4"
              >
                <i className="fas fa-cart-plus align-self-center mr-2 fa-sm" />
                <small className="font-weight-bold">Cart</small>
              </button>

              <div className="d-flex d-row">
                <div
                  className="px-3 py-2 ml-3"
                  style={{ borderRadius: "7px", backgroundColor: "#dedede" }}
                >
                  {props.dataProduct.productType}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapDispatchToProps = { addItemToCart };

export default connect(null, mapDispatchToProps)(ProductDetailModal);
