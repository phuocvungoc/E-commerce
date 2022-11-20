import React, { useEffect, useState } from "react";
import ProductAPI from "../API/ProductAPI";
import { Link, useParams } from "react-router-dom";
import alertify from "alertifyjs";
import { format } from "timeago.js";
import ReactStars from "react-rating-stars-component";
import CommentAPI from "../API/CommentAPI";
import CartAPI from "../API/CartAPI";

function Detail(props) {
  const [detail, setDetail] = useState();
  const [category, setCategory] = useState("");
  const [longDesc, setLongDesc] = useState();
  const [shortDesc, setShortDesc] = useState();
  const [count, setCount] = useState(1);
  const [maxCount, setMaxCount] = useState(1);
  const [star, setStar] = useState(5);
  const [isComment, setIsComment] = useState();
  const [product, setProduct] = useState([]);
  const [comment, setComment] = useState("");
  const [list_comment, set_list_comment] = useState([]);
  const { id } = useParams();
  const idUser = localStorage.getItem("idUser");
  const nameUser = localStorage.getItem("nameUser");

  const firstExample = {
    size: 20,
    value: 5,
    edit: false,
  };

  const secondExample = {
    size: 20,
    count: 5,
    color: "black",
    activeColor: "rgb(255, 215, 0)",
    value: 0,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      setStar(newValue);
    },
  };

  const threeExample = {
    size: 10,
    value: `${list_comment.star}` || 5,
    edit: false,
  };

  //Hàm này để lấy dữ liệu chi tiết sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getDetail(id);
      console.log(response);
      setDetail(response);
      setCategory(response.category);
      setMaxCount(response.stock);
      setLongDesc(response.long_desc.split("\n"));
      setShortDesc(response.short_desc.split("\n"));
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      await CommentAPI.getCommentByUser(idUser, id).then((res) => {
        console.log(res);
        if (res.idUser) {
          setIsComment(false);
        } else setIsComment(true);
      });
    };

    fetchData();
  }, [id]);

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handlerComment = () => {
    if (!idUser) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error("Vui Lòng Kiểm Tra Đăng Nhập!");
      return;
    }

    if (comment.length < 10) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error("Vui Lòng Đánh Giá Ít Nhất 10 kí tự!");
      return;
    }

    const fetchSendComment = async () => {
      try {
        const dataCmt = {
          idProduct: id,
          idUser: idUser,
          fullname: nameUser,
          content: comment,
          star: star,
        };
        await CommentAPI.postComment(id, dataCmt);
        alertify.set("notifier", "position", "bottom-left");
        alertify.success("Cảm ơn đánh giá của bạn!");
        setIsComment(false);
      } catch (error) {
        alertify.set("notifier", "position", "bottom-left");
        alertify.error(`${error.response.data}`);
      }
    };

    fetchSendComment();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await CommentAPI.getCommentProduct(id);
      set_list_comment(response);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (category) {
        const response = await ProductAPI.getCategory(category, id);
        setProduct(response);
      }
    };

    fetchData();
  }, [category, id]);

  //Phần này là để thay đổi số lượng khi mua sản phẩm

  const onChangeText = (e) => {
    setCount(e.target.value);
  };

  //Tăng lên 1 đơn vị
  const upText = () => {
    const value = parseInt(count) + 1;

    if (value === maxCount + 1) return;

    setCount(value);
  };

  //Giảm 1 đơn vị
  const downText = () => {
    const value = parseInt(count) - 1;

    if (value === 0) return;

    setCount(value);
  };

  //Phần này dùng để xem review hay description
  const [review, setReview] = useState("description");
  const handlerReview = (value) => {
    setReview(value);
  };

  const addToCart = async (e) => {
    try {
      e.preventDefault();
      const cart = {
        productId: id,
        count: count,
      };
      await CartAPI.postCart(cart);
      alertify.set("notifier", "position", "bottom-left");
      alertify.success("Bạn Đã Thêm Hàng Thành Công!");

      setTimeout(() => {
        window.location.href = "/cart";
      }, 1000);
    } catch (error) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error(`${error.response.data}`);
    }
  };

  return (
    <section className="py-5">
      {detail && (
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-6">
              <div className="row m-sm-0">
                <div className="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0">
                  <div
                    className="owl-thumbs d-flex flex-row flex-sm-column"
                    data-slider-id="1"
                  >
                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                      <img
                        className="w-100"
                        src={detail?.imgUrl[0].url}
                        alt="..."
                      />
                    </div>
                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                      <img
                        className="w-100"
                        src={detail.imgUrl[1].url}
                        alt="..."
                      />
                    </div>
                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                      <img
                        className="w-100"
                        src={detail.imgUrl[2].url}
                        alt="..."
                      />
                    </div>
                    <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                      <img
                        className="w-100"
                        src={detail.imgUrl[3].url}
                        alt="..."
                      />
                    </div>
                  </div>
                </div>

                <div
                  id="carouselExampleControls"
                  className="carousel slide col-sm-10 order-1 order-sm-2"
                  data-ride="carousel"
                >
                  <div className="carousel-inner owl-carousel product-slider">
                    <div className="carousel-item active">
                      <img
                        className="d-block w-100"
                        src={detail.imgUrl[0].url}
                        alt="First slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100"
                        src={detail.imgUrl[1].url}
                        alt="Second slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100"
                        src={detail.imgUrl[2].url}
                        alt="Third slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100"
                        src={detail.imgUrl[3].url}
                        alt="Third slide"
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <ReactStars {...firstExample} />
              <h1>{detail.name}</h1>
              {maxCount === 0 && (
                <h5 className="mb-2 mt-2 red-text">
                  This product is currently out of stock!
                </h5>
              )}
              <p className="text-muted lead">
                {detail.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                VNĐ
              </p>
              {shortDesc?.map((item, index) => (
                <p className="text-small mb-4" key={index}>
                  {item}
                </p>
              ))}
              {maxCount !== 0 && (
                <div className="row align-items-stretch mb-4">
                  <div className="col-sm-5 pr-sm-0">
                    <div className="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white">
                      <span className="small text-uppercase text-gray mr-4 no-select">
                        Quantity
                      </span>
                      <div className="quantity">
                        <button
                          className="dec-btn p-0"
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className="fas fa-caret-left"
                            onClick={downText}
                          ></i>
                        </button>
                        <input
                          className="form-control border-0 shadow-0 p-0"
                          type="number"
                          value={count}
                          onChange={onChangeText}
                        />
                        <button
                          className="inc-btn p-0"
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className="fas fa-caret-right"
                            onClick={upText}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3 pl-sm-0">
                    <a
                      className="btn btn-dark btn-sm btn-block d-flex align-items-center justify-content-center px-0 text-white"
                      onClick={addToCart}
                    >
                      Add to cart
                    </a>
                  </div>
                  <a className="btn btn-link text-dark p-1 mb-4" href="#">
                    <i className="far fa-heart mr-2"></i>Add to wish list
                  </a>
                  <br></br>
                  <ul className="list-unstyled small d-inline-block">
                    <li className="px-3 py-2 mb-1 bg-white">
                      <strong className="text-uppercase">SKU:</strong>
                      <span className="ml-2 text-muted">039</span>
                    </li>
                    <li className="px-3 py-2 mb-1 bg-white">
                      <strong className="text-uppercase">STOCK:</strong>
                      <span className="ml-2 text-muted">{detail.stock}</span>
                    </li>
                    <li className="px-3 py-2 mb-1 bg-white text-muted">
                      <strong className="text-uppercase text-dark">
                        Category:
                      </strong>
                      <a className="reset-anchor ml-2">{detail.category}s</a>
                    </li>
                    <li className="px-3 py-2 mb-1 bg-white text-muted">
                      <strong className="text-uppercase text-dark">
                        Tags:
                      </strong>
                      <a className="reset-anchor ml-2">Innovation</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {isComment && (
            <div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Comment:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  onChange={onChangeComment}
                  value={comment}
                ></textarea>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex w-25">
                  <span className="mt-2">Evaluate: </span>
                  &nbsp; &nbsp;
                  <ReactStars {...secondExample} />
                </div>
                <div>
                  <a
                    className="btn btn-dark btn-sm btn-block px-0 text-white"
                    style={{ width: "12rem" }}
                    onClick={handlerComment}
                  >
                    Send
                  </a>
                </div>
              </div>
            </div>
          )}
          <br />
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <a
                className="nav-link fix_comment"
                onClick={() => handlerReview("description")}
                style={
                  review === "description"
                    ? { backgroundColor: "#383838", color: "#ffffff" }
                    : { color: "#383838" }
                }
              >
                Description
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fix_comment"
                onClick={() => handlerReview("review")}
                style={
                  review === "review"
                    ? { backgroundColor: "#383838", color: "#ffffff" }
                    : { color: "#383838" }
                }
              >
                Reviews
              </a>
            </li>
          </ul>
          <div className="tab-content mb-5">
            {review === "description" ? (
              <div className="tab-pane fade show active">
                <div className="p-4 p-lg-5 bg-white">
                  <h6 className="text-uppercase mb-2">Product description </h6>
                  {longDesc?.map((item, index) => (
                    <p className="text-muted text-small mb-2" key={index}>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="tab-pane fade show active">
                <div className="p-4 p-lg-5 bg-white">
                  <div className="row">
                    <div className="col-lg-8">
                      {list_comment &&
                        list_comment.map((value) => (
                          <div className="media mb-3" key={value._id}>
                            <img
                              className="rounded-circle"
                              src="https://img.icons8.com/color/36/000000/administrator-male.png"
                              alt=""
                              width="50"
                            />
                            <div className="media-body ml-3">
                              <h6 className="mb-0">{value.fullname}</h6>
                              <p className="small text-muted mb-0">
                                {format(value.createdAt)}
                              </p>
                              <ReactStars {...threeExample} />
                              <p className="text-small mb-0 text-muted">
                                {value.content}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <h2 className="h5 text-uppercase mb-4">Related products</h2>
          <div className="row">
            {product &&
              product.map((value) => (
                <div className="col-lg-3 col-sm-6" key={value._id}>
                  <div className="product text-center skel-loader">
                    <div className="d-block mb-3 position-relative">
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
                            <a className="btn btn-sm btn-outline-dark text-white">
                              <i className="far fa-heart"></i>
                            </a>
                          </li>
                          <li className="list-inline-item m-0 p-0">
                            <a className="btn btn-sm btn-dark text-white">
                              Add to cart
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
                    <p className="small text-muted">{value.price} VNĐ</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Detail;
