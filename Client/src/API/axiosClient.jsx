// api/axiosClient.js
import axios from "axios";
const accessToken = localStorage.getItem("accessToken");
// const idUser = localStorage.getItem("idUser");
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  baseURL: "https://server-ecommerce-nodejs.herokuapp.com", // https://server-ecommerce-nodejs.herokuapp.com
  // withCredentials: true,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    // idUser: `${idUser}`,
  },
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
