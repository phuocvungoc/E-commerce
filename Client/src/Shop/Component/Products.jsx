import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Products.propTypes = {
  products: PropTypes.array,
  sort: PropTypes.string,
};

Products.defaultProps = {
  products: [],
  sort: "",
};

function Products(props) {
  const { products, sort } = props;

  if (sort === "DownToUp") {
    products.sort((a, b) => {
      return (
        Number(a.price.replace(".", "")) - Number(b.price.replace(".", ""))
      );
    });
  } else if (sort === "UpToDown") {
    products.sort((a, b) => {
      return (
        Number(b.price.replace(".", "")) - Number(a.price.replace(".", ""))
      );
    });
  }

  return (
    <div className="row">
      {/* -------------Product----------------- */}
      {products &&
        products.map((value) => (
          <div className="col-lg-4 col-sm-6 Section_Category" key={value._id}>
            <div className="product text-center">
              <div className="position-relative mb-3">
                <div className="badge text-white badge-"></div>
                <Link className="d-block" to={`/detail/${value._id}`}>
                  <img
                    className="img-fluid w-100"
                    src={value.imgUrl[0].url}
                    alt="..."
                  />
                </Link>
                <div className="product-overlay">
                  <ul className="mb-0 list-inline">
                    <li className="list-inline-item m-0 p-0">
                      <a className="btn btn-sm btn-outline-dark" href="#">
                        <i className="far fa-heart"></i>
                      </a>
                    </li>
                    <li className="list-inline-item m-0 p-0">
                      <Link
                        className="btn btn-sm btn-dark"
                        to={`/detail/${value._id}`}
                      >
                        Add to cart
                      </Link>
                    </li>
                    <li className="list-inline-item mr-0">
                      {/* D??ng Modal ph???i c?? href ????? n?? hi???n ra th???ng ???? v?? thu???c t??nh data-toggle="modal" ????? m??? modal*/}
                      <a
                        className="btn btn-sm btn-outline-dark"
                        href={`#product_${value._id}`}
                        data-toggle="modal"
                      >
                        <i className="fas fa-expand"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <h6>
                {" "}
                <a className="reset-anchor" href="detail.html">
                  {value.name}
                </a>
              </h6>
              <p className="small text-muted">{value.price} VN??</p>
            </div>
          </div>
        ))}
      {/* -------------Product----------------- */}
    </div>
  );
}

export default Products;
