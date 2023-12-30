import { toast } from "react-toastify";
const initialState = {
  isProductLoading: false,
  dataProduct: [],
  dataCart: [],
  dataOrder:[],
  alert: {
    show: false,
    message: "",
    variant: "light",
  },
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IS_PRODUCT_LOADING":
      return {
        ...state,
        isProductLoading: action.boolean,
      };

    case "USER_GET_DATA_PRODUCT":
      return {
        ...state,
        dataProduct: action.payload,
      };

    case "ADD_ITEM_TO_CART":
      const data = {
        ...action.payload,
        orderQuantity: 1,
      };
      const dataIsSame = state.dataCart.find((item) => {
        return item.productID === data.productID;
      });

      if (!dataIsSame) {
        toast.success("Item added to cart!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });

        return {
          ...state,
          dataCart: [...state.dataCart, data],
        };
      } else {
        toast.error("This item already in cart.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return state;
      }

    case "INCREASE_QTY_BUY":
      const dataCart = state.dataCart.map((item) => {
        if (action.payload === item.productID) {
          // ++ = item.orderQuantity + 1, pkai ini krna kalau +1 ngga diterima
          item.orderQuantity++;
        }

        return item;
      });

      return {
        ...state,
        // kalau namanya sama key & value boleh jadi 1
        dataCart,
      };

    case "DECREASE_QTY_BUY":
      const dataCartDecrease = state.dataCart.map((item) => {
        if (action.payload === item.productID && item.orderQuantity !== 1) {
          item.orderQuantity--;
        }

        return item;
      });

      return {
        ...state,
        dataCart: dataCartDecrease,
      };

    case "DELETE_ITEM_FROM_CART":
      const filteredItem = state.dataCart.filter((item) => {
        if (item.productID === action.payload.productID) {
          return false;
        } else return true;
      });
      return {
        ...state,
        dataCart: filteredItem,
      };

    case "CREATE_ORDER_REQUEST":
      return {
        ...state,
        isCreatingOrder: true,
      };

    case "CREATE_ORDER_SUCCESS":
      const newOrder = action.payload;
      return {
        ...state,
        isCreatingOrder: false,
        orders: [...state.dataOrder, newOrder],
        dataCart: [], // Assuming you want to clear the cart after creating an order
      };

    case "CREATE_ORDER_FAILURE":
      const error = action.payload;
      // Handle error state if needed
      return {
        ...state,
        isCreatingOrder: false,
        orderError: error,
      };

    default:
      return state;
  }
};

export default UserReducer;
