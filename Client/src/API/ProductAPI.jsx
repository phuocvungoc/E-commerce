import axiosClient from "./axiosClient";

const ProductAPI = {
  getAPI: () => {
    const url = "/api/products";
    return axiosClient.get(url);
  },

  getCategory: (category, id) => {
    const url = `/api/products/category?category=${category}&id=${id}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/api/products/${id}`;
    return axiosClient.get(url);
  },
};

export default ProductAPI;
