import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminAPI from "../../API/adminAPI";
import { ColorRing } from "react-loader-spinner";

const DataTable = ({ columns }) => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [keySearch, setKeySearch] = useState();
  const [list, setList] = useState();

  let pageName;
  switch (path) {
    case "users":
      pageName = "Users List";
      break;
    case "products":
      pageName = "Products List";
      break;
    case "orders":
      pageName = "Orders List";
      break;
    default:
      break;
  }

  useEffect(() => {
    setData(null);
    setLoad(true);
    const fetchData = async () => {
      try {
        const res = await AdminAPI.getData(path);
        setData(res);
        setLoad(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path]);

  const onSearch = (keyword) => {
    setKeySearch(keyword);

    const dataNew = data.filter((prod) =>
      prod.name.toLowerCase().includes(keyword.toLowerCase())
    );

    setList(dataNew);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete the product?")) {
      try {
        await AdminAPI.deleteSomething(path, id);
      } catch (err) {
        alert(err.response.data);
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${path}/update/${params.row._id}`}
              style={{ textDecoration: "none" }}
              className="editButton"
            >
              Update
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="page-wrapper">
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <h4 className="card-title titleTable">{pageName}</h4>
                    {path === "products" && (
                      <>
                        <input
                          className="form-control--css"
                          name="search"
                          id="search"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              onSearch(e.target.value);
                            }
                          }}
                          type="text"
                          placeholder="Enter Search!"
                        />
                        <div className="dataTableTitle">
                          <Link to={`/${path}/new`} className="link">
                            Add New
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="dataTable">
                    {data && !keySearch && (
                      <DataGrid
                        getRowHeight={() => {
                          if (path === "products") {
                            return "auto";
                          } else return 52;
                        }}
                        className="dataGrid"
                        rows={data}
                        columns={columns.concat(actionColumn)}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        getRowId={(row) => row._id}
                      />
                    )}

                    {keySearch && (
                      <DataGrid
                        getRowHeight={() => {
                          if (path === "products") {
                            return "auto";
                          } else return 52;
                        }}
                        className="dataGrid"
                        rows={list}
                        columns={columns.concat(actionColumn)}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        getRowId={(row) => row._id}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
