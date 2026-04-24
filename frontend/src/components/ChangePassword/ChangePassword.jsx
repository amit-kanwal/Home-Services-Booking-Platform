import "./ChangePassword.css";
import { useState, useEffect } from "react";
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
        let field = err?.response?.data?.field;

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

  const renderInput = (label, name, fieldKey) => (
    <div className="change-pass-element">
      <label htmlFor={name}>{label}</label>
      <div style={{display : "flex", gap : "10px", alignItems : "center"}}>
        <input
          type={showPassword[fieldKey] ? "text" : "password"}
          placeholder={label}
          id={name}
          name={name}
          required
          value={passwordData[name]}
          onChange={handlePasswordFormChange}
          className="change-password-input"
        />
        <span onClick={() => togglePassword(fieldKey)}>
          {showPassword[fieldKey] ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div>
        {errors[name] && <p>{errors[name]}</p>}
      </div>
    </div>
  );

  return (
    <div className="password-change">
      <h3 className="change-password-heading">Change Password</h3>

      <form className="form-change-password" onSubmit={handleOnSubmit}>
        {renderInput("Enter old password", "oldPassword", "old")}
        {renderInput("Enter new password", "newPassword", "new")}
        {renderInput(
          "Confirm new password",
          "confirmNewPassword",
          "confirm"
        )}

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