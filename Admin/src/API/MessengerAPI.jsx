import axiosClient from "./axiosClient";

const MessengerAPI = {
  getRoomOpen: () => {
    const url = `/api/messenger/roomOpen`;
    return axiosClient.get(url);
  },

  getMessageByRoomId: (roomId) => {
    const url = `/api/messenger/room/${roomId}`;
    return axiosClient.get(url);
  },

  addMessage: (data) => {
    const url = `/api/messenger/addMessage`;
    return axiosClient.put(url, data);
  },
};

export default MessengerAPI;
