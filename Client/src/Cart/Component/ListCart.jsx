import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatMoney from "accounting-js/lib/formatMoney.js";
import CartAPI from "../../API/CartAPI";
import alertify from "alertifyjs";

ListCart.propTypes = {
  listCart: PropTypes.array,
  onDeleteCart: PropTypes.func,
  onUpdateCount: PropTypes.func,
};

ListCart.defaultProps = {
  listCart: [],
  onDeleteCart: null,
  onUpdateCount: null,
};

function ListCart(props) {
  const { listCart } = props;
  const [error, setError] = useState();

  const deleteCart = async (id) => {
    try {
      await CartAPI.deleteCart(id);
      alertify.set("notifier", "position", "bottom-left");
      alertify.success("Bạn đã xóa sản phẩm khỏi giỏ hàng!");

      setTimeout(() => {
        window.location.href = "/cart";
      }, 1000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handlerChangeText = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="table-responsive mb-4">
      {error && <span className="text-danger">{error}</span>}
      <table className="table">
        <thead className="bg-light">
          <tr className="text-center">
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Image</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Product</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Price</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Quantity</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Total</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Remove</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {listCart &&
            listCart.map((value, index) => (
              <tr className="text-center" key={index}>
                <td className="pl-0 border-0">
                  <div className="media align-items-center justify-content-center">
                    <Link
                      className="reset-anchor d-block animsition-link"
                      to={`/detail/${value.productId}`}
                    >
                      <img src={value.img} alt="..." width="70" />
                    </Link>
                  </div>
                </td>
                <td className="align-middle border-0">
                  <div className="media align-items-center justify-content-center">
                    <Link
                      className="reset-anchor h6 animsition-link"
                      to={`/detail/${value.productId}`}
                    >
                      {value.nameProduct}
                    </Link>
                  </div>
                </td>

                <td className="align-middle border-0">
                  <p className="mb-0 small">
                    {formatMoney(value.priceProduct, {
                      symbol: "đ",
                      precision: 0,
                    })}
                  </p>
                </td>
                <td className="align-middle border-0">
                  <div className="quantity justify-content-center">
                    <input
                      className="form-control form-control-sm border-0 shadow-0 p-0"
                      type="text"
                      value={value.quantity}
                      onChange={handlerChangeText}
                    />
                  </div>
                </td>
                <td className="align-middle border-0">
                  <p className="mb-0 small">
                    {formatMoney(
                      parseInt(value.priceProduct) * parseInt(value.quantity),
                      {
                        symbol: "đ",
                        precision: 0,
                      }
                    )}
                  </p>
                </td>
                <td className="align-middle border-0">
                  <a
                    className="reset-anchor remove_cart"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => deleteCart(value._id)}
                  >
                    <i className="fas fa-trash-alt small text-muted"></i>
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCart;
