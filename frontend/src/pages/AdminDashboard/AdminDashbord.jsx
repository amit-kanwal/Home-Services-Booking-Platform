import React from "react";
import { useState, useEffect } from "react";
import api from "../../Utils/axiosApi.js";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../components/AdminNav/AdminNav.jsx";
import Logout from "../../components/Logout/logout.jsx";
import "./AdminDashboard.css";
import AdminProfile from "../../components/AdminProfile/AdminProfile.jsx";
import FlaggedBookings from "../../components/FlaggedBookings/FlaggedBookings.jsx";
import CustomerList from "../../components/CustomerList/CustomerList.jsx";
import ProviderList from "../../components/ProviderList/ProviderList.jsx";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";

function AdminDashboard({ setToken, setUser }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const [activeBtn, setActiveBtn] = useState("profile");
  const [activeBtnTwo, setActiveBtnTwo] = useState("profile");
  const [username , setUsername] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    api
      .get(`/adminInfo/${userId}`)
      .then((result) => {
        setUsername(result.data[0].username)
        setEmail(result.data[0].email)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFlaggedBookingsBtnClick = () => {
    setActiveBtn("flaggedBookings");
  };

  const handleProfileBtnClick = () => {
    setActiveBtn("profile");
  };

  const handleCustomerListBtnClick = () => {
    setActiveBtn("customer");
  };

  const handleProviderListBtnClick = () => {
    setActiveBtn("provider");
  };

  return (
    <div>
      <AdminNav />
      <div className="provider-dashboard-layout">
        <section className="left-provider">
          <p className="login-top-info">
            Welcome <strong>Admin</strong>
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
              className={`pro-btn ${activeBtn === "flaggedBookings" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleFlaggedBookingsBtnClick}
            >
              Flagged Bookings
            </button>
            <button
              className={`pro-btn ${activeBtn === "customer" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleCustomerListBtnClick}
            >
              Customer List
            </button>
            <button
              className={`pro-btn ${activeBtn === "password" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleProviderListBtnClick}
            >
             Provider List
            </button>
          </div>
          <div style={{ margin: "0 auto 20px !important" }}>
            <Logout setUser={setUser} setToken={setToken} />
          </div>
        </section>
        <section className="right-provider" style={{ marginBottom: "10px" }}>
          {activeBtn === "profile" && (
            <AdminProfile username = {username} email={email}/>
          )}
          {activeBtn === "flaggedBookings" && (
            <FlaggedBookings />
          )}
          {activeBtn === "customer" && (
            <CustomerList/>
          )}
          {activeBtn === "provider" && (
            <ProviderList />
          )}
        </section>
      </div>
      <div className="provider-dashboard-layout-two">
        <section className="whole-provider">
          <div className="top-info-provider-two">
            <p className="login-top-info-two">
              Welcome <strong>Admin</strong>
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
              Profile
            </button>
            <button
              className={`pro-btn ${activeBtn === "flaggedBookings" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleFlaggedBookingsBtnClick}
            >
              Flagged Bookings
            </button>
            <button
              className={`pro-btn ${activeBtn === "customer" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleCustomerListBtnClick}
            >
              Customer List
            </button>
            <button
              className={`pro-btn ${activeBtn === "provider" ? "active-provider-btn" : "non-active-provider-btn"}`}
              onClick={handleProviderListBtnClick}
            >
              Provider List
            </button>
          </div>
          <div className="dropdown-element">
            <Dropdown value={activeBtn} onChange={(val) => setActiveBtn(val)} />
          </div>
        </section>
        <section
          className="bottom-provider"
          style={{ marginBottom: "10px", height: "max-content" }}
        >
          {activeBtn === "profile" && (
            <AdminProfile username = {username} email={email}/>
          )}
          {activeBtn === "editable" && (
            <FlaggedBookings />
          )}
          {activeBtn === "image" && (
            <CustomerList/>
          )}
          {activeBtn === "password" && (
            <ProviderList/>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
