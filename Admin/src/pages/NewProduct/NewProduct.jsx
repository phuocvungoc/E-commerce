import React, { useState } from "react";
import ImageUploader from "../../Components/ImageUploading/ImageUploader";
import "./newProduct.scss";
import ProductAPI from "../../API/ProductAPI";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [images, setImages] = useState([]);

  const onChangeImage = (urlImages) => {
    setImages(urlImages);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoad(true);
      const newProduct = {
        productName: e.target.productName.value,
        category: e.target.category.value,
        images: images,
        shortDesc: e.target.shortDesc.value,
        longDesc: e.target.longDesc.value,
        price: e.target.price.value,
        stock: e.target.stock.value,
      };

      await ProductAPI.postNewProduct(newProduct);
      alert("Add product success!");
      setLoad(false);
      navigate("/products");
    } catch (error) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="container-new">
      <div className="wrap-new100 p-l-55 p-r-55 ">
        <span className="login100-form-title">Add New Product</span>
        <div className="d-flex justify-content-center pb-5">
          {err && <span className="text-danger">{err}</span>}
        </div>
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
              type="number"
              className="form-control validate"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              name="stock"
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
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="description">Upload Image (5 images)</label>
            <ImageUploader onChangeImage={onChangeImage} />
          </div>
          {load ? (
            <div className="div-btn">
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          ) : (
            <div className="div-btn">
              <button
                type="submit"
                className="btn btn-primary btn-block text-uppercase"
              >
                Add Product Now
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default NewProduct;
