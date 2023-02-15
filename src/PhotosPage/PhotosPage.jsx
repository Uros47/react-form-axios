import React from "react";
import { postPhoto } from "../service/PhotosCalls";
import { getPhoto } from "../service/PhotosCalls";
import { useState } from "react";

const PhotosPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(null);

  const token = localStorage.getItem("token");

  const previewImageHandler = (event) => {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setSelectedImage(event.target.files[0]);
  };

  const imageUploadHandler = () => {
    try {
      const formData = new FormData();
      formData.append("photo", selectedImage, selectedImage.name);
      postPhoto(formData, token).then((response) => {
        setImageUploaded(true);
        console.log(response, "post image response");
      });
    } catch (error) {
      console.log("image object is empty");
    }
  };

  const getPhotos = () => {
    getPhoto(token).then((response) => console.log(response, "get photo"));
  };

  if (imageUploaded) {
    return (
      <div className="photos-page">
        <img className="img-preview" src={previewImage} alt="" />
      </div>
    );
  } else
    return (
      <div className="photos-page">
        {!previewImage && (
          <label htmlFor="file-upload" className="photo-button">
            Upload main photo
            <input id="file-upload" type="file" onChange={previewImageHandler} />
            <i className="uploadIcon fas fa-cloud-upload-alt"></i>
          </label>
        )}

        {previewImage && (
          <div className="img-and-buttons">
            <img className="img-preview" src={previewImage} alt="" />
            <div>
              <button className="photo-button" onClick={imageUploadHandler}>
                upload image
              </button>
              <button
                className="photo-button"
                onClick={() => {
                  setPreviewImage(null);
                }}
              >
                cancel upload
              </button>
            </div>
          </div>
        )}
      </div>
    );
};

export default PhotosPage;
