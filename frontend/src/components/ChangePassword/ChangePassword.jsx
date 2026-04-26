import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
import api from "../../Utils/axiosApi.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (showResponse) {
      const timer = setTimeout(() => setResponse(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showResponse]);

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (passwordData.oldPassword.length < 6) {
      newErrors.oldPassword = "Minimum 6 characters required";
    }

    if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Minimum 6 characters required";
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords should match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    api
      .put("/ChangePassword", passwordData)
      .then(() => {
        setMessage("Password change successful");
        setMessageColor("green");

        setPasswordData({
          username: username,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });

        setResponse(true);
      })
      .catch((err) => {
        const field = err?.response?.data?.field;

        if (field === "oldPassword") {
          setMessage("Old password does not match");
        } else {
          setMessage("Something went wrong");
        }

        setMessageColor("red");
        setResponse(true);

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
          <label htmlFor="oldPassword">Enter old password</label>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type={showPassword.old ? "text" : "password"}
              placeholder="Enter old password"
              id="oldPassword"
              name="oldPassword"
              required
              value={passwordData.oldPassword}
              onChange={handlePasswordFormChange}
              className="change-password-input"
            />
            <span onClick={() => togglePassword("old")}>
              {showPassword.old ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div>
            {errors.oldPassword && <p>{errors.oldPassword}</p>}
          </div>
        </div>

        <div className="change-pass-element">
          <label htmlFor="newPassword">Enter new password</label>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type={showPassword.new ? "text" : "password"}
              placeholder="Enter new password"
              id="newPassword"
              name="newPassword"
              required
              value={passwordData.newPassword}
              onChange={handlePasswordFormChange}
              className="change-password-input"
            />
            <span onClick={() => togglePassword("new")}>
              {showPassword.new ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div>
            {errors.newPassword && <p>{errors.newPassword}</p>}
          </div>
        </div>

        <div className="change-pass-element">
          <label htmlFor="confirmNewPassword">Confirm new password</label>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type={showPassword.confirm ? "text" : "password"}
              placeholder="Confirm new password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              required
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordFormChange}
              className="change-password-input"
            />
            <span onClick={() => togglePassword("confirm")}>
              {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div>
            {errors.confirmNewPassword && (
              <p>{errors.confirmNewPassword}</p>
            )}
          </div>
        </div>

        <div className="change-password-btn-container">
          <button type="submit" className="change-pass-btn">
            Change Password
          </button>
        </div>
      </form>

      <div style={{ height: "20px", textAlign: "center" }}>
        {showResponse && (
          <div style={{ color: messageColor }}>{message}</div>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;