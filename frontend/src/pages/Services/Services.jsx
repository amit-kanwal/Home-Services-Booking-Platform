import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import ServiceProviderList from "../../components/ServiceProviderList/ServiceProviderList";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import "./Services.css";

function Services() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [providerInfo, setProviderInfo] = useState([]);
  const [categoryName, selectCategoryName] = useState(""); 

  const handleCategoryChange = (e) => {
    navigate(`/Services/${e.target.value}`);
  };

  const categoryObj = {
    Popular : "Popular",
    Cleaning : "Cleaning",
    Repair : "Repairing",
    Plumbing : "Plumbling",
    Electrical  : "Electrical Work",
    Shifting : "Shifting",
    Gardening : "Gardening",
    Painting : "Painting",
    PestControl : "Pest Control",
  }

  useEffect(() => {
    selectCategoryName(categoryObj[category])
    getProviderInfo();
  }, [category]);

  const getProviderInfo = () => {
    axios
      .get(`/api/serviceProviderinfo?category=${category}`)
      .then((res) => setProviderInfo(res.data))
      .catch((err) => console.log("error"));
  };

  return (
    <div>
      <Navbar />
      <div className="services-top">
        <div className="service-top-heading">
          <h2 style={{ fontWeight: "500", marginTop: "20px", padding: "0 10px", color: "blue" }}>
          {categoryName} Services
        </h2>
        </div >
        
        <span className="service-top-heading">
          <select
            name="selectCategory"
            className="select-category"
            id="selectCategory"
            value={category}
            onChange={handleCategoryChange}
          >
            <option className="Category-option" name="Popular" value="Popular">Popular</option>
            <option className="Category-option" name="House Cleaning" value="Cleaning">Cleaning</option>
            <option className="Category-option" name="House Repairs" value="Repair">Repairs</option>
            <option className="Category-option" name="Plumbing" value="Plumbing">Plumbing</option>
            <option className="Category-option" name="Shifting" value="Shifting">Shifting</option>
            <option className="Category-option" name="Painting" value="Painting">Painting</option>
            <option className="Category-option" name="Electrical Work" value="Electrical">Electrical</option>
            <option className="Category-option" name="Gardening" value="Gardening">Gardening</option>
            <option className="Category-option" name="Pest Control" value="PestControl">Pest Control</option>
          </select>
        </span>
      </div>

      <ServiceProviderList providerInfo={providerInfo} text="No provider found"/>
      <Footer />
    </div>
  );
}

export default Services;
