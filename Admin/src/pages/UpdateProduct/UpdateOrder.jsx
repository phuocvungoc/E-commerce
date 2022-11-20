import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HistoryAPI from "../../API/HistoryAPI";
import { format } from "timeago.js";
import "./updateProduct.scss";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const UpdateOrder = (props) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [loadUpdate, setLoadUpdate] = useState(false);
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const [err, setErr] = useState();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoad(true);
    const fetchData = async () => {
      try {
        const res = await HistoryAPI.getDetail(orderId);
        setData(res);
        setProducts(res.orders.items);
        setLoad(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoadUpdate(true);
      const data = {
        status: e.target.pay.value,
        delivery: e.target.delivery.value,
      };

      await HistoryAPI.postUpdateOrder(orderId, data);

      alert("Update order success!");
      setLoadUpdate(false);
      navigate("/orders");
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="container-new">
      {load ? (
        <div className="div-btn">
          <ColorRing
            visible={true}
            height="200"
            width="200"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <div className="wrap-new100 p-l-55 p-r-55 ">
          <span className="login100-form-title">Information Order</span>
          <div className="d-flex justify-content-center pb-5">
            {err && <span className="text-danger">{err}</span>}
          </div>
          {data && (
            <>
              <p className="mb-2">
                <b>OrderID:</b> {data._id}
              </p>
              <p className="mb-2">
                <b>Full Name:</b> {data.fullname}
              </p>
              <p className="mb-2">
                <b>Number Phone:</b> {data.phone}
              </p>
              <p className="mb-2">
                <b>Address:</b> {data.address}
              </p>
              <p className="mb-2">
                <b>Total:</b>{" "}
                {data.total && data.total.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                VNĐ
              </p>
              <p className="mb-2">
                {" "}
                <b>Time Order:</b> {format(data.createdAt)}
              </p>
            </>
          )}

          <div className="table-responsive pt-3 pb-5">
            <table className="table">
              <thead className="bg-light">
                <tr className="text-center">
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">
                      ID Product
                    </strong>
                  </th>
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">Image</strong>
                  </th>
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">Name</strong>
                  </th>
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">Price</strong>
                  </th>
                  <th className="border-0" scope="col">
                    {" "}
                    <strong className="text-small text-uppercase">Count</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((value) => (
                    <tr className="text-center" key={value._id}>
                      <td className="align-middle border-0">
                        <h6 className="mb-0">{value._id}</h6>
                      </td>
                      <td className="pl-0 border-0">
                        <div className="media align-items-center justify-content-center">
                          <img src={value.img} alt="..." width="100" />
                        </div>
                      </td>
                      <td className="align-middle border-0">
                        <h6 className="mb-0">{value.nameProduct}</h6>
                      </td>
                      <td className="align-middle border-0">
                        <h6 className="mb-0">
                          {value.priceProduct
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                          VNĐ
                        </h6>
                      </td>
                      <td className="align-middle border-0">
                        <h6 className="mb-0">{value.quantity}</h6>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <form
              className="tm-edit-product-form"
              type="submit"
              onSubmit={onSubmit}
            >
              <div className="form-group mb-3">
                <label htmlFor="status">
                  <b>Status:</b>{" "}
                </label>
                <select name="pay" id="pay" className="select-pay">
                  <option defaultValue={data.status}>{data.status}</option>
                  <option value="Đã Thanh Toán">Đã Thanh Toán</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="delivery">
                  <b>Delivery:</b>{" "}
                </label>
                <select name="delivery" id="delivery" className="select-pay">
                  <option defaultValue={data.delivery}>{data.delivery}</option>
                  <option value="Đang Vận Chuyển">Đang Vận Chuyển</option>
                  <option value="Đã Giao Hàng">Đã Giao Hàng</option>
                </select>
              </div>
              {loadUpdate ? (
                <div className="div-btn">
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
              ) : (
                <div className="div-btn">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block text-uppercase"
                  >
                    Update Order
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdateOrder;
