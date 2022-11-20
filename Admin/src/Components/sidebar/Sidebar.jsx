import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DevicesIcon from "@mui/icons-material/Devices";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const onLogout = async () => {
    localStorage.removeItem("nameUser");
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Admin</span>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </NavLink>
          <p className="title">LISTS</p>
          <NavLink to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </NavLink>
          <NavLink to="/products" end style={{ textDecoration: "none" }}>
            <li>
              <DevicesIcon className="icon" />
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <ReceiptLongIcon className="icon" />
              <span>Orders</span>
            </li>
          </NavLink>
          <NavLink to="/products/new" style={{ textDecoration: "none" }}>
            <li>
              <FiberNewIcon className="icon" />
              <span>New Product</span>
            </li>
          </NavLink>
          <p className="title">USEFUL</p>
          <NavLink to="/chat" style={{ textDecoration: "none" }}>
            <li>
              <ChatBubbleOutlineIcon className="icon" />
              <span>Chat</span>
            </li>
          </NavLink>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          {role && (
            <>
              <p className="title">SERVICE</p>
              <li>
                <SettingsApplicationsIcon className="icon" />
                <span>Settings</span>
              </li>
              <p className="title">USER</p>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>Profile</span>
              </li>

              <li onClick={onLogout}>
                <ExitToAppIcon className="icon" />
                <span>Logout</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
