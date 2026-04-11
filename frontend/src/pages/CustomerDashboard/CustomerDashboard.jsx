import { useState, useEffect } from "react";
import api from "../../Utils/axiosApi.js";
import NavLogin from "../../components/NavLogin/NavLogin.jsx";
import Logout from "../../components/Logout/logout.jsx";
import "./customerDashboard.css";
import axios from "axios";
import CategoryListVirtual from "../../components/CategoryListVirtual/CategoryListVirtual.jsx";
import LoginProviderList from "../../components/LoginProviderList/LoginProviderList.jsx";

function CustomerDashboard({ setToken, setUser }) {
  const [customer, setCustomerInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [providerInfo, setProviderInfo] = useState([]);
  const [category, setCategory] = useState("Cleaning");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    api
      .get("/userInfo")
      .then((result) => {
        console.log(result.data);
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
        console.log("Error in userInfo");
      });
  }, []);

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    getProviderInfo(category);
  }, [category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const getProviderInfo = (category) => {
    axios
      .get(`/api/serviceProviderinfo?category=${category}`)
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
            <CategoryListVirtual
              categoryList={categories}
              setCategory={setCategory}
              currentCategory={category}
            />
          </div>
          <div style={{ margin: "0 auto 20px" }}>
            <Logout setUser={setUser} setToken={setToken} />
          </div>
        </section>
        <section className="right">
          <h2>{category}</h2>
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
