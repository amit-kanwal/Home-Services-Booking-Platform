import React from "react";
import { useState, useEffect } from "react";
import api from "../../Utils/axiosApi.js";
import { useNavigate } from "react-router-dom";
import ProviderNav from "../../components/ProviderLogin/ProviderNav";
import Logout from "../../components/Logout/logout.jsx";
import "./ProviderDashboard.css";
import ProviderProfile from "../../components/ProviderProfile/ProviderProfile.jsx";
import ChangePassword from "../../components/ChangePassword/ChangePassword.jsx";
import Editable from "../../components/Editable/Editable.jsx";
import ChangeImage from "../../components/ChangeImage/ChangeImage.jsx";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";

function ProviderDashboard({ setToken, setUser }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [providerInfo, setProviderInfo] = useState({});
  const userId = user.id;
  const [activeBtn, setActiveBtn] = useState("profile");
  const [activeBtnTwo, setActiveBtnTwo] = useState("profile");
  const [image_url, setImageUrl] = useState(null);

  useEffect(() => {
    api
      .get(`/providerInfo/${userId}`)
      .then((result) => {
        const providerInfo = {
          name: result.data[0].name,
          phone: result.data[0].contact,
          email: result.data[0].email,
          address: result.data[0].address,
          username: result.data[0].username,
          image : result.data[0].image_url,
          category : result.data[0].category,
          businessName : result.data[0].business_name,
          price : result.data[0].price,
          about : result.data[0].about
        };
        setImageUrl(providerInfo.image)
        setProviderInfo(providerInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [image_url]);

  const handleChangeImageBtnClick = () => {
    setActiveBtn("image");
  };

  const handleProfileBtnClick = () => {
    setActiveBtn("profile");
  };

  const handleChangePasswordBtnClick = () => {
    setActiveBtn("password");
  };

  const handleEditableBtnClick = () => {
    setActiveBtn("editable");
  };

  return (
    <div>
      <ProviderNav />
      <div className="provider-dashboard-layout">
        <section className="left-provider">
          <p className="login-top-info">
            Welcome <strong>{providerInfo?.name}</strong>
          </p>
          <hr
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "grey",
              width: "100%",
              margin: "15px 0",
            }}
          />
          <div className="provider-profile-btn-container">
            <button
              className={`pro-btn ${activeBtn === "profile" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleProfileBtnClick}
            >
              My Profile
            </button>
            <button
              className={`pro-btn ${activeBtn === "editable" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleEditableBtnClick}
            >
              Update Profile
            </button>
            <button
              className={`pro-btn ${activeBtn === "image" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleChangeImageBtnClick}
            >
              Change Image
            </button>
            <button
              className={`pro-btn ${activeBtn === "password" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleChangePasswordBtnClick}
            >
              Change Password
            </button>
          </div>
          <div style={{ margin: "0 auto 20px !important" }}>
            <Logout setUser={setUser} setToken={setToken} />
          </div>
        </section>
        <section className="right-provider" style={{ marginBottom: "10px" }}>
          {activeBtn === "profile" && <ProviderProfile provider={providerInfo}/>}
          {activeBtn === "editable" && <Editable  provider={providerInfo} userId={userId}/>}
          {activeBtn === "image" && <ChangeImage image_url={providerInfo.image} userId={userId} setImageUrl={setImageUrl}/>}
          {activeBtn === "password" && (
            <ChangePassword username={providerInfo.username} />
          )}
        </section>
      </div>
      <div className="provider-dashboard-layout-two">
        <section className="whole-provider">
          <div className="top-info-provider-two">
            <p className="login-top-info-two">
              Welcome <strong>{providerInfo?.name}</strong>
            </p>
            <span
              style={{
                display: "flex",
                height: "inherit",
                alignItems: "center",
                marginRight: "10px",
              }}
              className="lg-btn"
            >
              <Logout setUser={setUser} setToken={setToken} />
            </span>
          </div>
          <hr />
          <h2 className="provider-section-two-heading">Please Select</h2>
          <div className="provider-btn-two">
            <button
              className={`pro-btn ${activeBtn === "profile" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleProfileBtnClick}
            >
              My Profile
            </button>
            <button
              className={`pro-btn ${activeBtn === "editable" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleEditableBtnClick}
            >
              Update Profile
            </button>
            <button
              className={`pro-btn ${activeBtn === "image" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleChangeImageBtnClick}
            >
              Change Image
            </button>
            <button
              className={`pro-btn ${activeBtn === "password" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleChangePasswordBtnClick}
            >
              Change Password
            </button>
          </div>
          <div className="dropdown-element">
            <Dropdown admin={false} value={activeBtn} onChange={(val) => setActiveBtn(val)} />
          </div>
        </section>
        <section
          className="bottom-provider"
          style={{ marginBottom: "10px", height: "max-content" }}
        >
          {activeBtn === "profile" && <ProviderProfile provider={providerInfo}/>}
          {activeBtn === "editable" && <Editable provider={providerInfo} userId={userId}/>}
          {activeBtn === "image" && <ChangeImage image_url={providerInfo.image} userId={userId} setImageUrl={setImageUrl}/>}
          {activeBtn === "password" && (
            <ChangePassword username={providerInfo.username} />
          )}
        </section>
      </div>
    </div>
  );
}

export default ProviderDashboard;
