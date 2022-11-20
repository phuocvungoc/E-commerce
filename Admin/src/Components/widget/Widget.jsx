import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useState, useEffect } from "react";
import AdminAPI from "../../API/adminAPI";
import { ColorRing } from "react-loader-spinner";

const Widget = ({ type }) => {
  let data;
  const [load, setLoad] = useState(false);
  const [countUser, setCountUser] = useState(1);
  const [countOrder, setCountOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [avgRevenue, setAvgRevenue] = useState(0);

  useEffect(() => {
    setLoad(true);
    const fetchCountUser = async () => {
      const response = await AdminAPI.getCountUser();
      setCountUser(response);
    };

    const fetchCountOrder = async () => {
      const response = await AdminAPI.getCountOrder();
      setCountOrder(response);
    };

    const fetchTotalRevenue = async () => {
      const response = await AdminAPI.getTotalRevenue();
      setTotalRevenue(response);
    };

    const fetchAvgRevenue = async () => {
      const response = await AdminAPI.getAvgRevenue();
      setAvgRevenue(response);
      setLoad(false);
    };

    fetchAvgRevenue();
    fetchTotalRevenue();
    fetchCountOrder();
    fetchCountUser();
  }, []);

  switch (type) {
    case "user":
      data = {
        params: countUser,
        title: "USERS",
        isMoney: false,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        params: countOrder,
        title: "ORDERS",
        isMoney: false,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        params: totalRevenue,
        title: "EARNINGS (VNĐ)",
        isMoney: true,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        params: avgRevenue,
        title: "BALANCE (VNĐ)",
        isMoney: true,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      {load && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney} {data.params}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive"></div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
