import "./ChangeImage.css";
import { compressImage } from "../../Utils/CompressImage.js";
import { useState, useRef, useEffect } from "react";
import api from "../../Utils/axiosApi.js";

function ChangeImage({ image_url, userId, setImageUrl }) {
  const [imgBorder, setImgBorder] = useState("2px solid rgb(86, 189, 230)");
  const [compressedImage, setCompressedImage] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const fileInputRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setCompressedImage(null);
      return;
    }

    try {
      const compressed = await compressImage(file);
      setCompressedImage(compressed);
      setImgBorder("2px solid green");
    } catch (err) {
      console.error(err);
      setErrMessage("Failed in compression");
      setImgBorder("2px solid red");
    }
  };

  const handleSubmit = async () => {
    if (!compressedImage) {
      setErrMessage("Image Required");
      return;
    }

    const formData = new FormData();
    formData.append("image", compressedImage);
    try {
      const result = await api.put(`/ChangeImage/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessageColor("green");
      setImageUrl(result.data.image_url);
      setMessage(result.data.message);
      fileInputRef.current.value = "";
      setCompressedImage(null);
      setImgBorder("2px solid rgb(86, 189, 230)");
      setShowMessage(true);
    } catch (err) {
      console.log("Error:", err);

      if (err.response) {
        console.log("backendError:", err.response.data);
        console.log("status:", err.response.status);
      } else if (err.request) {
        console.log("no response");
      } else {
        console.log("error:", err.message);
      }

      fileInputRef.current.value = "";
      setCompressedImage(null);
      setMessageColor("red");
      setMessage("Something went wrong");
      setShowMessage(true);
      setImgBorder("2px solid rgb(86, 189, 230)");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showMessage]);

  return (
    <div className="image-change">
      <h3 className="change-image-heading">Change Image</h3>
      <div className="image-change-body">
        <div className="current-image">
          <h4 className="image-heading">Current Image</h4>
          <img
            src={image_url}
            alt="ProviderImage"
            onError={(e) => {
              e.target.src = "/No_Image_Available.jpg";
            }}
            className="provider-dashboard-img"
          ></img>
        </div>
        <div className="new-image">
          <h4 className="image-heading">Upload Image</h4>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            onClick={() => setErrMessage("")}
            style={{ border: imgBorder }}
            className="img-provider-input"
            required
            ref={fileInputRef}
          />
          <div
            className="err-message"
            style={{
              color: "red",
              fontSize: "14px",
              height: "10px",
              textAlign: "center",
            }}
          >
            {errMessage}
          </div>
          <button className="img-change-btn" onClick={handleSubmit}>
            Update Image
          </button>
          {showMessage && (
            <div
              className="err-message"
              style={{
                color: `${messageColor}`,
                fontSize: "14px",
                height: "10px",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangeImage;
