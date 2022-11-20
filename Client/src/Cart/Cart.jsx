import React, { useEffect, useState } from "react";
import ListCart from "./Component/ListCart";
import { Link } from "react-router-dom";
import CartAPI from "../API/CartAPI";
import alertify from "alertifyjs";
import formatMoney from "accounting-js/lib/formatMoney.js";

function Cart(props) {
  const idUser = localStorage.getItem("idUser");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState();

  function getTotal(carts) {
    let sub_total = 0;

    const sum_total = carts.map((value) => {
      console.log(parseInt(value.priceProduct));
      return (sub_total +=
        parseInt(value.priceProduct) * parseInt(value.quantity));
    });

    setTotal(sub_total);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (idUser) {
        const response = await CartAPI.getCarts();
        console.log(response);
        setCart(response);
        getTotal(response);
      }
    };
    fetchData();
  }, [idUser]);

  const onCheckout = () => {
    if (!idUser !== false) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error("Vui Lòng Kiểm Tra Lại Đăng Nhập!");
      return;
    }

    if (cart.length === 0) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error("Vui Lòng Kiểm Tra Lại Giỏ Hàng!");
      return;
    }

    window.location.href = "/checkout";
  };

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Cart</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    Cart
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <ListCart listCart={cart} />

            <div className="bg-light px-4 py-3">
              <div className="row align-items-center text-center">
                <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                  <Link
                    className="btn btn-link p-0 text-dark btn-sm"
                    to={`/shop`}
                  >
                    <i className="fas fa-long-arrow-alt-left mr-2"> </i>Continue
                    shopping
                  </Link>
                </div>
                <div className="col-md-6 text-md-right">
                  <span
                    className="btn btn-outline-dark btn-sm"
                    onClick={onCheckout}
                  >
                    Proceed to checkout
                    <i className="fas fa-long-arrow-alt-right ml-2"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 rounded-0 p-lg-4 bg-light">
              <div className="card-body">
                <h5 className="text-uppercase mb-4">Cart total</h5>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center justify-content-between">
                    <strong className="text-uppercase small font-weight-bold">
                      Subtotal
                    </strong>
                    <span className="text-muted small">
                      {formatMoney(total, {
                        symbol: "đ",
                        precision: 0,
                        format: "%v %s",
                      })}
                    </span>
                  </li>
                  <li className="border-bottom my-2"></li>
                  <li className="d-flex align-items-center justify-content-between mb-4">
                    <strong className="text-uppercase small font-weight-bold">
                      Total
                    </strong>
                    <span>
                      {formatMoney(total, {
                        symbol: "đ",
                        precision: 0,
                        format: "%v %s",
                      })}
                    </span>
                  </li>
                  <li>
                    <form>
                      <div className="form-group mb-0">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter your coupon"
                        />
                        <button
                          className="btn btn-dark btn-sm btn-block"
                          type="submit"
                        >
                          {" "}
                          <i className="fas fa-gift mr-2"></i>Apply coupon
                        </button>
                      </div>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
