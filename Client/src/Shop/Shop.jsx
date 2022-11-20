import React, { useEffect, useState } from "react";
import ProductAPI from "../API/ProductAPI";
import { useLocation } from "react-router-dom";
import Search from "./Component/Search";
import Pagination from "./Component/Pagination";
import Products from "./Component/Products";
import SortProduct from "./Component/SortProduct";
import { ColorRing } from "react-loader-spinner";

function Shop(props) {
  const [load, setLoad] = useState(false);
  const location = useLocation();
  const categoryParam = location.pathname.split("/")[2] || "all";
  const [productsAll, setProductsAll] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsFillTer, setProductsFillTer] = useState([]);
  const [category, setCategory] = useState(categoryParam);
  const [keySearch, setKeySearch] = useState("");
  const [sort, setSort] = useState("default");
  const [totalPage, setTotalPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: "1",
    count: 9,
    search: "",
    category: "all",
  });

  useEffect(() => {
    setLoad(true);
    const fetchData = async () => {
      const response = await ProductAPI.getAPI();
      setProductsAll(response);

      const data = response.slice(0, pagination.count);
      setProducts(data);
      setTotalPage(Math.ceil(response.length / pagination.count));

      const productsNew = response.filter(
        (prod) => prod.category.toLowerCase() === category.toLowerCase()
      );

      setProductsFillTer(productsNew);
      setLoad(false);
    };

    fetchData();
  }, []);

  const handlerChangeSort = (value) => {
    setSort(value);
  };

  const handlerChangePage = (value) => {
    const dataPage = productsAll.slice(
      pagination.count * (value - 1),
      pagination.count * value
    );

    setProducts(dataPage);

    setPagination({
      page: value,
      count: pagination.count,
      search: pagination.search,
      category: pagination.category,
    });
  };

  const handlerSearch = (value) => {
    setKeySearch(value);

    const productsNew = products.filter((prod) =>
      prod.name.toLowerCase().includes(value.toLowerCase())
    );

    setProductsFillTer(productsNew);

    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: value,
      category: pagination.category,
    });
  };

  const handlerCategory = (value) => {
    setCategory(value);

    const productsNew = products.filter(
      (prod) => prod.category.toLowerCase() === value.toLowerCase()
    );

    setProductsFillTer(productsNew);

    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: pagination.search,
      category: value,
    });
  };

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Shop</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    Shop
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* -------------Modal Product----------------- */}
      {products &&
        products.map((value) => (
          <div
            className="modal fade show"
            id={`product_${value._id}`}
            key={value._id}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-body p-0">
                  <div className="row align-items-stretch">
                    <div className="col-lg-6 p-lg-0">
                      <img
                        style={{ width: "100%" }}
                        className="product-view d-block h-100 bg-cover bg-center"
                        src={value.imgUrl[0].url}
                        data-lightbox={`product_${value._id}`}
                      />
                      <img className="d-none" src={value.imgUrl[1].url} />
                      <img className="d-none" src={value.imgUrl[2].url} />
                    </div>
                    <div className="col-lg-6">
                      {/* Để tắt modal phải có class="close" và data-dissmiss="modal" và aria-label="Close" */}
                      <a
                        className="close p-4"
                        type="button"
                        href="#section_product"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        ×
                      </a>
                      <div className="p-5 my-md-4">
                        <ul className="list-inline mb-2">
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                        </ul>
                        <h2 className="h4">{value.name}</h2>
                        <p className="text-muted">{value.price} VNĐ</p>
                        {value.short_desc.split("\n").map((item, index) => (
                          <p className="text-small mb-4" key={index}>
                            {item}
                          </p>
                        ))}
                        <div className="row align-items-stretch mb-4">
                          <div className="col-sm-5 pl-sm-0 fix_addwish">
                            <a className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0">
                              <i className="far fa-heart mr-2"></i>Add Too Wish
                              List
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {/* -------------Modal Product----------------- */}

      <section className="py-5">
        <div className="container p-0">
          <div className="row">
            <div className="col-lg-3 order-2 order-lg-1">
              <h5 className="text-uppercase mb-4">Categories</h5>
              <div className="py-2 px-4 bg-dark text-white mb-3">
                <strong className="small text-uppercase font-weight-bold">
                  {/* Fashion &amp; Acc */}
                  APPLE
                </strong>
              </div>
              <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal">
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("all")}
                  >
                    All
                  </a>
                </li>
              </ul>
              <div className="py-2 px-4 bg-light mb-3">
                <strong className="small text-uppercase font-weight-bold">
                  IPHONE &amp; MAC
                </strong>
              </div>
              <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal">
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("iphone")}
                  >
                    Iphone
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("ipad")}
                  >
                    Ipad
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("macbook")}
                  >
                    MacBook
                  </a>
                </li>
              </ul>
              <div className="py-2 px-4 bg-light mb-3">
                <strong className="small text-uppercase font-weight-bold">
                  WIRELESS
                </strong>
              </div>
              <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal">
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("watch")}
                  >
                    Watch
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("airpod")}
                  >
                    Air Pod
                  </a>
                </li>
              </ul>
              <div className="py-2 px-4 bg-light mb-3">
                <strong className="small text-uppercase font-weight-bold">
                  OTHER
                </strong>
              </div>
              <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal mb-5">
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("mouse")}
                  >
                    Mouse
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("keyboard")}
                  >
                    Keyboard
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("other")}
                  >
                    Other
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
              <div className="row mb-3 align-items-center">
                {/* ------------------Search----------------- */}
                <Search handlerSearch={handlerSearch} />
                {/* ------------------Search----------------- */}

                <div className="col-lg-8">
                  <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                    <li className="list-inline-item">
                      <SortProduct handlerChangeSort={handlerChangeSort} />
                    </li>
                  </ul>
                </div>
              </div>
              {load ? (
                <ColorRing
                  visible={true}
                  height="200"
                  width="200"
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
              ) : (
                <>
                  {(category !== "all" || keySearch) && (
                    <Products products={productsFillTer} sort={sort} />
                  )}

                  {category === "all" && !keySearch && (
                    <Products products={products} sort={sort} />
                  )}
                </>
              )}
              <Pagination
                pagination={pagination}
                handlerChangePage={handlerChangePage}
                totalPage={totalPage}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
