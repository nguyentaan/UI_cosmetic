import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Modal, Button } from "react-bootstrap";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import OrderDetaislModal from "./OrderDetailsModal";
import OrderEditModal from "./OrderEditModal";
// import { getDataUser, deleteUser } from "../../actionCreators/AdminAction";
// import { useDispatch } from "react-redux";

const AdminOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8081/orders/getAll");
        const responseData = response.data.data; // Update this line

        console.log("response", response);

        if (Array.isArray(responseData)) {
          setOrders(responseData);
        } else {
          console.error("Error: responseData is not an array", responseData);
        }
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  const tokenAdmin = localStorage.getItem("token-admin");

  const handleDelete = async () => {
    try {
      // Assuming your backend API endpoint for deleting orders is something like "/orders/delete"
      const response = await axios.delete(
        `http://localhost:8081/orders/delete/${dataDelete.orderID}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": tokenAdmin,
          },
        }
      );

      // Check if the deletion was successful
      if (response.status === 200) {
        console.log("Order deleted successfully");
        // Optionally, you can update the state to remove the deleted order
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.orderID !== dataDelete.orderID)
        );
      } else {
        console.error("Error deleting order:", response.data);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // DELETE MODAL FORM.
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  const showOrderDetails = (data) => {
    setSelectedOrder(data);
    setShowOrderModal(true);
  };

  const showOrderEditModal = (data) => {
    setSelectedOrder(data);
    setShowEditModal(true);
  };

  const unDisplayCheckoutModal = (boolean) => {
    setShowOrderModal(boolean);
    setShowEditModal(boolean);
  };

  const displayDeleteModal = (data) => {
    setDataDelete(data);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const DeleteProductModal = () => {
    return (
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>Are you sure want to delete this order</p>
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

  //Search
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter((item) => {
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    const phoneNumber = item.phoneNumber ? String(item.phoneNumber) : "";
    const status = item.status ? item.status.toLowerCase() : "";

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      phoneNumber.includes(searchTerm) ||
      status.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="text-center container">
      <input
        type="text"
        placeholder="Search User by Name, Email, or Phone Number"
        value={searchTerm}
        onChange={handleSearchChange}
        className=" my-3 search-input"
      />
      <Table className="table table-success">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>FirstName</Th>
            <Th>LastName</Th>
            <Th>Phone Number</Th>
            <Th>Status</Th>
            <Th>
              <i className="far fa-eye fa-lg mr-4"></i>
              <i className="far fa-edit fa-lg mr-4"></i>
              <i className="far fa-trash-alt fa-lg"></i>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredOrders.map((item, index) => {
            return (
              <Tr key={index}>
                <Td className="text-justify text-center">{index + 1}</Td>
                <Td className="text-justify text-center">{item.firstName}</Td>
                <Td className="text-justify text-center">{item.lastName}</Td>
                <Td className="text-justify text-center">
                  0{item.phoneNumber}
                </Td>
                <Td
                  className="t
                ext-justify text-center"
                >
                  {item.status}
                </Td>
                <Td>
                  <button
                    className="btn btn-info mr-2"
                    onClick={() => showOrderDetails(item.orderID)}
                  >
                    <i className="far fa-eye fa-lg"></i>
                  </button>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => showOrderEditModal(item)}
                  >
                    <i className="far fa-edit fa-lg"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => displayDeleteModal(item)}
                  >
                    <i className="far fa-trash-alt fa-lg"></i>
                  </button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <DeleteProductModal />
      <OrderDetaislModal
        order={selectedOrder}
        showOrderModal={showOrderModal}
        unDisplayCheckoutModal={unDisplayCheckoutModal}
      />
      <OrderEditModal
        order={selectedOrder}
        showEditModal={showEditModal}
        unDisplayCheckoutModal={unDisplayCheckoutModal}
      />
    </div>
  );
};

export default AdminOrders;
