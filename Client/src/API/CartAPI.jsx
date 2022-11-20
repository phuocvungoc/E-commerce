import axiosClient from "./axiosClient";

const CartAPI = {
  getCarts: () => {
    const url = `/api/carts`;
    return axiosClient.get(url);
  },

  postCart: (data) => {
    const url = `/api/carts/add`;
    return axiosClient.post(url, data);
  },

  deleteCart: (id) => {
    const url = `/api/carts/delete-item/${id}`;
    return axiosClient.delete(url);
  },

  postOrder: (data) => {
    const url = `/api/carts/order`;
    return axiosClient.post(url, data);
  },
};

export default CartAPI;
