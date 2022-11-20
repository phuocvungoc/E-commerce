import axiosClient from "./axiosClient";

const AuthAPI = {
  postLogin: (data) => {
    const url = `/api/auth/login`;
    return axiosClient.post(url, data);
  },

  postSignUp: (data) => {
    const url = `/api/auth/signup`;
    return axiosClient.post(url, data);
  },
};

export default AuthAPI;
