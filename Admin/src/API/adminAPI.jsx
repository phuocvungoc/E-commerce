import axiosClient from "./axiosClient";

const AdminAPI = {
  getCountUser: () => {
    const url = "/api/admin/countUser";
    return axiosClient.get(url);
  },

  getCountOrder: () => {
    const url = "/api/admin/countOrder";
    return axiosClient.get(url);
  },

  getTotalRevenue: () => {
    const url = "/api/admin/totalRevenue";
    return axiosClient.get(url);
  },

  getAvgRevenue: () => {
    const url = "/api/admin/avgRevenue";
    return axiosClient.get(url);
  },

  getNewOrders: () => {
    const url = "/api/admin/newOrders";
    return axiosClient.get(url);
  },

  getData: (path) => {
    const url = `/api/admin/${path}`;
    return axiosClient.get(url);
  },

  deleteSomething: (path, id) => {
    const url = `/api/admin/${path}/${id}`;
    return axiosClient.delete(url);
  },
};

export default AdminAPI;
