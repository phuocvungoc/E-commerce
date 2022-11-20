import axiosClient from "./axiosClient";

const MessengerAPI = {
  getMessageByRoomId: (roomId) => {
    const url = `/api/messenger/room/${roomId}`;
    return axiosClient.get(url);
  },

  newRoom: () => {
    const url = `/api/messenger/newRoom`;
    return axiosClient.post(url);
  },

  addMessage: (body) => {
    const url = `/api/messenger/addMessage`;
    return axiosClient.put(url, body);
  },
};

export default MessengerAPI;
