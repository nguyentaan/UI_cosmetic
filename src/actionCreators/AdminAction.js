import axios from "axios";

const url = `${process.env.REACT_APP_API_URL}`;
const tokenAdmin = localStorage.getItem("token-admin");

// FOR ADMIN USER PART

export const getDataUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${url}/users/get`, {
        headers: { "x-access-token": tokenAdmin },
      });
      const output = response.data;

      dispatch({
        type: "GET_DATA_USER",
        payload: output.data,
      });
    } catch (error) {
      const errorOutput = error.response;
      console.log(errorOutput);
    }
  };
};

export const deleteUser = (dataId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${url}/users/delete/${dataId}`, {
        headers: { "x-access-token": tokenAdmin },
      });

      dispatch({
        type: "DELETE_USER",
        payload: dataId,
      });
    } catch (error) {
      const errorOutput = error.response;
      console.log(errorOutput);
    }
  };
};

// FOR ADMIN PRODUCT PART

export const addDataProduct = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${url}/products/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": tokenAdmin,
        },
      });
      const output = response.data;
      dispatch({
        type: "ADD_DATA_PRODUCT",
        // payload must be the return from backend because that's best
        payload: output.data,
      });
    } catch (error) {
      const errorOutput = error.response;

      if (errorOutput.status === 400) {
        dispatch({
          type: "ADD_PRODUCT_FAILED",
          payload: "Please fill all field in the form.",
        });
      }
    }
  };
};

export const getDataProduct = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${url}/products/getAllProducts`);
      const output = response.data;

      dispatch({
        type: "GET_DATA_PRODUCT",
        payload: output.data,
      });
    } catch (error) {
      const errorOutput = error.response;
      console.log(errorOutput);
    }
  };
};

export const editDataProduct = (FormEditData, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${url}/products/update/${data.productID}`,
        FormEditData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": tokenAdmin,
          },
        }
      );

      const updatedProduct = response.data.data; // Assuming your response structure has a 'data' property

      dispatch({
        type: "EDIT_DATA_PRODUCT",
        payload: updatedProduct,
      });

      console.log(`Product with ID ${data.productID} successfully updated!`);
    } catch (error) {
      console.error("Error in editDataProduct:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error during request setup:", error.message);
      }

      // Dispatch an action indicating failure or handle the error accordingly
      dispatch({
        type: "EDIT_DATA_PRODUCT_FAILURE",
        payload: error.message, // You might want to adjust this based on your needs
      });
    }
  };
};

export const deleteDataProduct = (dataId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${url}/products/delete/${dataId}`, {
        headers: { "x-access-token": tokenAdmin },
      });

      dispatch({
        type: "DELETE_DATA_PRODUCT",
        payload: dataId,
      });
    } catch (error) {
      const errorOutput = error.response;
      console.log(errorOutput);
    }
  };
};
