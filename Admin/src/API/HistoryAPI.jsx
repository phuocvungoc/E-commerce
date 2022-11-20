import axiosClient from "./axiosClient";

const HistoryAPI = {
  getDetail: (id) => {
    const url = `/api/histories/detail/${id}`;
    return axiosClient.get(url);
  },

  postUpdateOrder: (orderId, data) => {
    const url = `/api/admin/update-order/${orderId}`;
    return axiosClient.post(url, data);
  },
};

export default HistoryAPI;
