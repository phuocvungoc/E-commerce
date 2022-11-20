import axiosClient from "./axiosClient";

const UserAPI = {
  getDetailData: (id) => {
    const url = `/api/carts/user`;
    return axiosClient.get(url);
  },
};

export default UserAPI;
