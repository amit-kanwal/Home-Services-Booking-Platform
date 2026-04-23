import { useState, useEffect } from "react";
import api from "../../Utils/axiosApi.js";
import NavLogin from "../../components/NavLogin/NavLogin.jsx";
import Logout from "../../components/Logout/logout.jsx";
import "./customerDashboard.css";
import axios from "axios";
import CategoryListVertical from "../../components/CategoryListVertical/CategoryListVertical.jsx";
import LoginProviderList from "../../components/LoginProviderList/LoginProviderList.jsx";
import CategoryListHorizontal from "../../components/CategoryListHorizontal/CategoryListHorizontal.jsx";
import { useNavigate } from "react-router-dom";

function CustomerDashboard({ setToken, setUser }) {
  const [customer, setCustomerInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [providerInfo, setProviderInfo] = useState([]);
  const [category, setCategory] = useState("Cleaning");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/userInfo")
      .then((result) => {
        const userInfo = {
          name: result.data[0].name,
          phone: result.data[0].contact,
          email: result.data[0].email,
          latitude: result.data[0].latitude,
          longitude: result.data[0].longitude,
          address: result.data[0].address,
        };
        setCustomerInfo(userInfo);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate("/");
      });
  }, []);

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    if (customer.latitude && customer.longitude) {
      getProviderInfo(category);
    }
  }, [category, customer.latitude, customer.longitude]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const getProviderInfo = (category) => {
    api
      .get(
        `/serviceProviderinfoLogin?category=${category}&lat=${customer.latitude}&lng=${customer.longitude}`,
      )
      .then((res) => setProviderInfo(res.data))
      .catch((err) => console.log("error"));
  };

  const getCategoriesList = () => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("error"));
  };

  return (
    <>
      <NavLogin />
      <div className="customer-dashboard-layout">
        <section className="left">
          <p className="login-top-info">
            Welcome <strong>{customer.name}</strong>
          </p>
          <div className="category-container-customerDashboard">
            <CategoryListVertical
              categoryList={categories}
              setCategory={setCategory}
              currentCategory={category}
            />
          </div>
          <div style={{ margin: "0 auto 10px" }}>
            <Logout setUser={setUser} setToken={setToken} />
          </div>
        </section>
        <section className="right" style={{marginBottom : "10px"}}>
          <h2 id="category-heading-login">{category}</h2>
          <LoginProviderList
            providerInfo={providerInfo}
            text="No providers available"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </div>
      <div className="customer-dashboard-layout-two">
        <section className="whole">
          <div className="top-info-two">
            <p className="login-top-info-two">
              Welcome <strong>{customer.name}</strong>
            </p>
            <span
              style={{
                display: "flex",
                height: "inherit",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <Logout setUser={setUser} setToken={setToken} />
            </span>
          </div>
          <div className="category-container-customerDashboard">
            <CategoryListHorizontal
              categoryList={categories}
              setCategory={setCategory}
              currentCategory={category}
            />
          </div>
          <h2 id="category-heading-login">{category}</h2>
          <LoginProviderList
            providerInfo={providerInfo}
            text="No providers available"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </div>
    </>
  );
}

export default CustomerDashboard;
