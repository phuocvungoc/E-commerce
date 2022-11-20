import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import "./Chat.scss";
import MessengerAPI from "../../API/MessengerAPI";
import ListUser from "../../Components/ListUser";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

function Chat(props) {
  const [listChat, setListChat] = useState([]);
  const [nameClient, setNameClient] = useState("");
  const [selectRoom, setSelectRoom] = useState("");
  const [message, setMessage] = useState([]);
  const [load, setLoad] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  const GetUserID = (roomId) => {
    setSelectRoom(roomId);
    listChat?.map((value) => {
      if (value._id === roomId) {
        setNameClient(value.userId.fullname);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await MessengerAPI.getRoomOpen();
      setListChat(response);
    };

    fetchData();
  }, [load]);

  useEffect(() => {
    if (selectRoom) {
      const fetchData = async () => {
        const response = await MessengerAPI.getMessageByRoomId(selectRoom);

        if (response.isEnd) {
          setTextMessage("");
          setMessage([]);
          setNameClient("");
          setListChat(listChat.filter((item) => item._id !== selectRoom));
        } else {
          setMessage(response);
        }
      };

      fetchData();
      setLoad(false);
    }
  }, [selectRoom, load]);

  useEffect(() => {
    // setLoad(false);
    socket.on("receive_message", (data) => {
      setLoad(true);
    });
  }, []);

  // Hàm này dùng để gửi tin nhắn cho khách hàng
  const handlerSend = async () => {
    if (!selectRoom || textMessage === "") {
      return;
    }

    const data = {
      message: textMessage,
      roomId: selectRoom,
      userId: message.userId._id,
      isAdmin: true,
    };

    if (selectRoom && textMessage.toLowerCase() === "/end") {
      socket.emit("send_message", data);

      await MessengerAPI.addMessage({
        message: "/end",
        roomId: selectRoom,
        isAdmin: true,
      });
      // setLoad(false);
      setTextMessage("");
      setMessage([]);
      setNameClient("");
      setListChat(listChat.filter((item) => item._id !== selectRoom));
      return;
    }

    //Sau đó nó emit dữ liệu lên server bằng socket với key send_message và value data
    socket.emit("send_message", data);

    const postData = async () => {
      await MessengerAPI.addMessage(data);

      setLoad(true);
    };

    postData();

    setTextMessage("");
  };

  return (
    <div className="row app-one">
      <div className="col-sm-3 side">
        <div className="side-one">
          <div className="row heading">
            <div className="col-sm-3 col-xs-3 heading-avatar">
              <div className="avatar-icon">
                <img src="https://cdn-icons-png.flaticon.com/512/924/924915.png" />
              </div>
            </div>
            <div className="col-sm-9 col-xs-1 d-flex align-items-center">
              <span>Admin</span>
            </div>
          </div>
          <div className="row searchBox">
            <div className="col-sm-12 searchBox-inner">
              <div className="form-group has-feedback">
                <input
                  id="searchText"
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                />
                <span className="glyphicon glyphicon-search form-control-feedback"></span>
              </div>
            </div>
          </div>

          <ListUser listUser={listChat} GetUserID={GetUserID} />
        </div>
      </div>

      <div className="col-sm-9 conversation">
        <div className="row heading">
          {nameClient && (
            <>
              <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                <div className="heading-avatar-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/4202/4202831.png" />
                </div>
              </div>
              <div className="col-sm-8 col-xs-7 heading-name">
                <div className="heading-name-meta">{nameClient}</div>
              </div>
            </>
          )}
        </div>
        <div className="row message" id="conversation">
          <div className="row message-previous">
            <div className="col-sm-12 previous">
              {message.message &&
                message.message.map((value) =>
                  value.isAdmin ? (
                    <div className="message-main-sender" key={value._id}>
                      <div className="sender">
                        <span className="message-time pull-right">Bạn</span>
                        <div className="message-text">{value.message}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="message-main-receiver" key={value._id}>
                      <div className="receiver">
                        <span className="message-time pull-right">
                          {value.name}
                        </span>
                        <div className="message-text">{value.message}</div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
        {nameClient && (
          <div className="row reply">
            <div className="col-sm-1 col-xs-1 reply-emojis">
              <SentimentVerySatisfiedIcon />
            </div>
            <div className="col-sm-9 col-xs-9 reply-main">
              <input
                className="form-control"
                type="text"
                onChange={(e) => setTextMessage(e.target.value)}
                value={textMessage}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handlerSend();
                  }
                }}
              />
            </div>
            <div className="col-sm-1 col-xs-1 reply-recording">
              <KeyboardVoiceIcon />
            </div>
            <div className="col-sm-1 col-xs-1 reply-send">
              <SendIcon onClick={handlerSend} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
