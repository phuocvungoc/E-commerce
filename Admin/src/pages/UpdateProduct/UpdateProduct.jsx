import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductAPI from "../../API/ProductAPI";
import ImageUploading from "react-images-uploading";
import "./updateProduct.scss";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const UpdateProduct = (props) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [loadUpdate, setLoadUpdate] = useState(false);
  const location = useLocation();
  const prodId = location.pathname.split("/")[3];
  const [data, setData] = useState([]);

  const {
    maxNumber = 5,
    acceptType = ["jpeg", "jpg", "png"],
    maxFileSize = 5000000,
  } = props;

  const [err, setErr] = useState("");
  const [images, setImages] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    const urlImages = imageList.map((item) => item.data_url);
    setImages(imageList);
    setNewImages(urlImages);
  };

  const onError = () => {
    props.onChangeImage([]);
    setImages([]);
  };

  const onRemove = (image) => {
    const imagesNew = imgUrl.filter((item) => item.url !== image);
    setImgUrl(imagesNew);
  };

  useEffect(() => {
    setLoad(true);
    const fetchData = async () => {
      try {
        const res = await ProductAPI.getDetail(prodId);
        setData(res);
        setImgUrl(res.imgUrl); // .map((item) => item.url)
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
      const imagesUpdate = imgUrl.concat(newImages);

      const updateProduct = {
        productName: e.target.productName.value,
        category: e.target.category.value,
        images: imagesUpdate,
        shortDesc: e.target.shortDesc.value,
        longDesc: e.target.longDesc.value,
        price: e.target.price.value,
        stock: e.target.stock.value,
      };

      await ProductAPI.postUpdateProduct(prodId, updateProduct);

      alert("Update product success!");
      setLoadUpdate(false);
      navigate("/products");
    } catch (error) {
      setErr(error.response.data);
    }

    // .then((res) => {

    //   return res.data;
    // })
    // .catch((err) => {
    //   if (err.response.status == 500) {

    //   }
    // });
  };

  return (
    <div className="container-new">
      <div className="wrap-new100 p-l-55 p-r-55 ">
        <span className="login100-form-title">Update Product</span>
        <div className="d-flex justify-content-center pb-5">
          {err && <span className="text-danger">{err}</span>}
        </div>
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
          <form
            className="tm-edit-product-form"
            type="submit"
            onSubmit={onSubmit}
          >
            <div className="form-group mb-3">
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                name="productName"
                defaultValue={data?.name}
                type="text"
                className="form-control validate"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                defaultValue={data?.category}
                type="text"
                className="form-control validate"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                defaultValue={data?.price}
                type="text"
                className="form-control validate"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="stock">Stock</label>
              <input
                id="stock"
                name="stock"
                defaultValue={data?.stock}
                type="number"
                className="form-control validate"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="shortDesc">Short Description</label>
              <textarea
                className="form-control validate"
                rows="1"
                id="shortDesc"
                name="shortDesc"
                defaultValue={data?.short_desc}
                required
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="longDesc">Long Description</label>
              <textarea
                className="form-control validate"
                rows="3"
                name="longDesc"
                id="longDesc"
                defaultValue={data?.long_desc}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="description">Upload Image (5 images)</label>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                onError={onError}
                maxNumber={maxNumber}
                acceptType={acceptType}
                maxFileSize={maxFileSize}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                  errors,
                }) => (
                  <>
                    {errors && (
                      <ul>
                        {errors.maxNumber && (
                          <li>Number of selected images exceed maxNumber</li>
                        )}
                        {errors.acceptType && (
                          <li>Your selected file type is not allow</li>
                        )}
                        {errors.maxFileSize && (
                          <li>Selected file size exceed maxFileSize</li>
                        )}
                      </ul>
                    )}

                    <div className="upload__image-wrapper">
                      <div
                        className="upload-container"
                        {...dragProps}
                        onClick={onImageUpload}
                        style={
                          isDragging
                            ? { backgroundColor: "#afafaf", color: "white" }
                            : undefined
                        }
                      >
                        Choose a file or Drag it here
                      </div>

                      <div className="p-2" style={{ textAlign: "left" }}>
                        {imgUrl?.map((image, index) => (
                          <div
                            key={index}
                            className="image-item  "
                            style={{
                              width: "150px",
                              marginRight: "10px",
                              display: "inline-block",
                            }}
                          >
                            <img
                              src={image.url}
                              alt=""
                              style={{ width: "100%" }}
                            />
                            <div className="image-item__btn-wrapper mt-1">
                              <div className="btn-group--update">
                                <button
                                  className="button-update remove"
                                  color="danger"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onRemove(image.url);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {imageList.map((image, index) => (
                          <div
                            key={index}
                            className="image-item"
                            style={{
                              width: "150px",
                              marginRight: "10px",
                              display: "inline-block",
                            }}
                          >
                            <img
                              src={image["data_url"]}
                              alt=""
                              style={{ width: "100%" }}
                            />
                            <div className="image-item__btn-wrapper mt-1">
                              <div className="btn-group--update">
                                <button
                                  className="button-update remove"
                                  color="danger"
                                  onClick={(e) => {
                                    onImageRemove(index);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </ImageUploading>
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
                  Update Product
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
export default UpdateProduct;
