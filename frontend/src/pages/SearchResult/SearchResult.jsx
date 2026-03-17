import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import ServiceProviderList from "../../components/ServiceProviderList/ServiceProviderList";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

function SearchResult() {
  const { category } = useParams();
  const [providerInfo, setProviderInfo] = useState([]);
  const [categoryName, setCategoryName] = useState(""); 

  const parameter = ()=>{
    let str = category;
    let converted = str.charAt(0).toUpperCase();
    converted = converted + str.slice(1).toLowerCase();
    let trimmed = converted.trim();
    setCategoryName(trimmed);
  }

  useEffect(() => {
    parameter();
    getProviderInfo();
  }, [categoryName]);

  const getProviderInfo = () => {
    axios
      .get(`/api/serviceProviderinfo?category=${categoryName}`)
      .then((res) => setProviderInfo(res.data))
      .catch((err) => console.log("error"));
  };

  return (
    <div>
      <Navbar />
      <div className="services-top">
        <div className="service-top-heading">
          <h2 style={{ fontWeight: "500", marginTop: "20px", padding: "0 10px" , fontSize: "1.5rem"}}>
          Showing search results for {category} 
        </h2>
        </div >
      </div>
      <ServiceProviderList providerInfo={providerInfo} text="No result found" />
      <Footer />
    </div>
  );
}

export default SearchResult;
