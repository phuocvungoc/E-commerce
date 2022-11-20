import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import { DataGrid } from "@mui/x-data-grid";
import Widget from "../../Components/widget/Widget";
import AdminAPI from "../../API/adminAPI";
import { ordersColumnsHome } from "../../dataTable";
import { ColorRing } from "react-loader-spinner";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    const fetchOrders = async () => {
      const response = await AdminAPI.getNewOrders();
      setOrders(response);
      setLoad(false);
    };

    fetchOrders();
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/orders/update/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <div className="listContainer">
        {load ? (
          <ColorRing
            visible={true}
            height="200"
            width="200"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          <>
            <div className="listTitle">Latest Transactions</div>
            <div className="dataTable">
              <DataGrid
                className="dataGrid"
                rows={orders}
                columns={ordersColumnsHome.concat(actionColumn)}
                pageSize={8}
                rowsPerPageOptions={[8]}
                getRowId={(row) => row._id}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
