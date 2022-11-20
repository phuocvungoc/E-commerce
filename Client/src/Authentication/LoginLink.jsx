import React from "react";
import { Link } from "react-router-dom";

function LoginLink(props) {
  const onLogout = () => {
    localStorage.removeItem("idUser");
    localStorage.removeItem("nameUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("roomId");
    window.location.href = "/signin";
  };

  return (
    <li className="nav-item" onClick={onLogout}>
      <Link className="nav-link">( Logout )</Link>
    </li>
  );
}

export default LoginLink;
