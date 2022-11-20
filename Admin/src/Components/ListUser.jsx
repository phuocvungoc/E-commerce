import React, { useState } from "react";
import { format } from "timeago.js";

function ListUser(props) {
  const { listUser, GetUserID } = props;
  const [currentSelected, setCurrentSelected] = useState();

  const onClickUser = (roomId) => {
    GetUserID(roomId);
    setCurrentSelected(roomId);
  };

  return (
    <div>
      {listUser &&
        listUser.map((value) => (
          <div
            className={`row sideBar-body ${
              value._id === currentSelected ? "selected-chat" : ""
            }`}
            key={value._id}
            onClick={() => onClickUser(value._id)}
          >
            <div className="col-sm-3 col-xs-3 sideBar-avatar">
              <div className="avatar-icon">
                <img src="https://cdn-icons-png.flaticon.com/512/4202/4202831.png" />
              </div>
            </div>
            <div className="col-sm-9 col-xs-9 sideBar-main">
              <div className="row">
                <div className="col-sm-8 col-xs-8 sideBar-name">
                  <span className="name-meta">{value.userId.fullname}</span>
                </div>
                <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
                  <span className="time-meta pull-right">Online</span>
                </div>
                <div className="col-sm-12 col-xs-12 ">
                  <span className="time-meta pull-right">
                    {format(value.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListUser;
