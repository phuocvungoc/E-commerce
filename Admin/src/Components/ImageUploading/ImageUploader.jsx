import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import "./imageUpload.scss";

const ImageUploader = (props) => {
  const {
    maxNumber = 5,
    acceptType = ["jpeg", "jpg", "png"],
    maxFileSize = 5000000,
  } = props;
  const [images, setImages] = useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    const urlImages = imageList.map((item) => item.data_url);
    props.onChangeImage(urlImages);
    setImages(imageList);
  };

  const onError = () => {
    props.onChangeImage([]);
    setImages([]);
  };

  return (
    <div>
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
                      src={image["data_url"] || image}
                      alt=""
                      style={{ width: "100%" }}
                    />
                    <div className="image-item__btn-wrapper mt-1">
                      <div className="btn-group">
                        <button
                          className="button update"
                          color="primary"
                          onClick={() => onImageUpdate(index)}
                        >
                          Update
                        </button>
                        <button
                          className="button remove"
                          color="danger"
                          onClick={() => onImageRemove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* {props.images && (
                <div className="p-2" style={{ textAlign: "left" }}>
                  {props.images.map((image, index) => (
                    <div
                      key={index}
                      className="image-item  "
                      style={{
                        width: "150px",
                        marginRight: "10px",
                        display: "inline-block",
                      }}
                    >
                      <img src={image} alt="" style={{ width: "100%" }} />
                      <div className="image-item__btn-wrapper mt-1">
                        <div className="btn-group">
                          <button
                            className="button update"
                            color="primary"
                            onClick={() => {
                              onImageUpdate(index);
                              onUpdate(index);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="button remove"
                            color="danger"
                            onClick={() => onImageRemove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          </>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
