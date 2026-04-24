import "./ChangePassword.css";
import { useState, useEffect, useRef } from "react";
import api from "../../Utils/axiosApi.js";

function ChangePassword({ username }) {
  const [showResponse, setResponse] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");
  const [passwordData, setPasswordData] = useState({
    username: username,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setResponse(false);
    }, 5000);
  }, [showResponse]);

  const validateForm = () => {
    let newErrors = {};

    if (passwordData.oldPassword.length < 6) {
      newErrors.oldPassword = "Minimum 6 character required";
      setErrors(newErrors);
      return false;
    }

    if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Minimum 6 character required";
      setErrors(newErrors);
      return false;
    }

    if (passwordData.newPassword != passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Password should match";
      setErrors(newErrors);
      return false;
    }

    setErrors(newErrors);
    // return true if newErrors is empty
    return true;
  };

  const handlePasswordFormChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    api
      .put("/ChangePassword", passwordData)
      .then((result) => {
        if (result.status === 400) {
          setMessage("Old password does not match");
          setMessageColor("red");
        } else {
          setMessage("Password change successful");
          setMessageColor("green");
        }
        setPasswordData({
          username: username,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setResponse(true);
      })
      .catch((err) => {
        let field;
        if (err.response && err.response.data) {
          field = err.response.data.field;
        }

        if (field === "oldPassword") {
          setMessage("Old password does not match");
        } else {
          setMessage("Something went wrong");
        }
        setResponse(true);
        setMessageColor("red");
        setPasswordData({
          username: username,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        console.log(err);
      });
  };

  return (
    <div className="password-change">
      <h3 className="change-password-heading">Change Password</h3>
      <form className="form-change-password" onSubmit={handleOnSubmit}>
        <div className="change-pass-element">
          <label htmlFor="oldPassword">Old password</label>
          <input
            type="text"
            placeholder="Enter old password"
            id="oldPassword"
            required
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={(e) => {
              errors.oldPassword = "";
              handlePasswordFormChange(e);
            }}
            className="change-password-input"
            style={{ marginBottom: "0px" }}
          />
          <div style={{ height: "8px", marginBottom: "10px" }}>
            {errors.oldPassword && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  fontWeight: "400",
                  height: "10px",
                }}
              >
                {errors.oldPassword}
              </p>
            )}
          </div>
        </div>
        <div className="change-pass-element">
          <label htmlFor="newPassword">New password</label>
          <input
            type="text"
            placeholder="Enter new password"
            id="newPassword"
            required
            name="newPassword"
            value={passwordData.newPassword}
            onChange={(e) => {
              errors.newPassword = "";
              handlePasswordFormChange(e);
            }}
            className="change-password-input"
            style={{ marginBottom: "0px" }}
          />
          <div style={{ height: "8px", marginBottom: "10px" }}>
            {errors.newPassword && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  fontWeight: "400",
                  height: "10px",
                }}
              >
                {errors.newPassword}
              </p>
            )}
          </div>
        </div>
        <div className="change-pass-element">
          <label htmlFor="ConfirmNewPassword">Confirm new password</label>
          <input
            type="text"
            placeholder="Confirm new password"
            name="confirmNewPassword"
            id="ConfirmNewPassword"
            required
            value={passwordData.confirmNewPassword}
            onChange={(e) => {
              errors.confirmNewPassword = "";
              handlePasswordFormChange(e);
            }}
            className="change-password-input"
            style={{ marginBottom: "0px" }}
          />
          <div style={{ height: "8px", marginBottom: "10px" }}>
            {errors.confirmNewPassword && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  fontWeight: "400",
                  height: "10px",
                }}
              >
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
        </div>
        <div className="change-password-btn-container">
          <button type="submit" className="change-pass-btn">
            Change Password
          </button>
        </div>
      </form>
      <div
        style={{
          height: "15px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {showResponse && (
          <div style={{ color: `${messageColor}`, fontWeight: "500" }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
