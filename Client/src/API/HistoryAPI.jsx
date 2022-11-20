import axiosClient from "./axiosClient";

const HistoryAPI = {
  getHistoryAPI: (params) => {
    const url = `/api/histories/${params}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/api/histories/detail/${id}`;
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
