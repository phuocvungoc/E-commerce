import axiosClient from "./axiosClient";

const ProductAPI = {
  getDetail: (id) => {
    const url = `/api/admin/products/${id}`;
    return axiosClient.get(url);
  },

  postNewProduct: (data) => {
    const url = `/api/admin/add-product`;
    return axiosClient.post(url, data);
  },

  postUpdateProduct: (prodId, data) => {
    const url = `/api/admin/update-product/${prodId}`;
    return axiosClient.post(url, data);
  },
};

export default ProductAPI;
