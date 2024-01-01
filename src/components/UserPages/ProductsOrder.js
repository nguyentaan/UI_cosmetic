import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Users.css'

function ProductsOrder(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/orders/displayOrderDetailInformation/${props.order.orderID}`
        );
        console.log("Products API Response:", response);
        const responseData = response.data.orderDetails;
        setProducts(responseData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, [props.order]);
  return (
    <>
      {products.map((product, i) => {
        return (
          <div className="body-card mb-2" key={i}>
            <div>
              <img className="image-card" src={product.image} alt="product" />
            </div>
            <div className="info-card">
              <div className="name-product font-weight-bold">
                {product.name}
              </div>
              <div className="orderQuantity card-text text-secondary">
                x{product.orderQuantity}
              </div>
            </div>
            <p className="price-product">${product.price}</p>
          </div>
        );
      })}
    </>
  );
}

export default ProductsOrder;
