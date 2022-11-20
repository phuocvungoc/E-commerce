import axiosClient from "./axiosClient";

const CommentAPI = {
  getCommentProduct: (id) => {
    const url = `/api/comment/${id}`;
    return axiosClient.get(url);
  },

  getCommentByUser: (idUser, idProd) => {
    const url = `/api/comment/cmtUser?idUser=${idUser}&idProd=${idProd}`;
    return axiosClient.get(url);
  },

  postComment: (id, data) => {
    const url = `/api/comment/send/${id}`;
    return axiosClient.post(url, data);
  },
};

export default CommentAPI;
