import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import ServiceProviderList from "../../components/ServiceProviderList/ServiceProviderList";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

function SearchResult() {
  const { category } = useParams();
  const [providerInfo, setProviderInfo] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (category) {
      const formattedCategory =
        category.charAt(0).toUpperCase() +
        category.slice(1).toLowerCase();

      const trimmed = formattedCategory.trim();

      setCategoryName(trimmed);

      getProviderInfo(trimmed);
    }
  }, [category]);

  const getProviderInfo = (selectedCategory) => {
    axios
      .get(`/api/serviceProviderinfo?category=${selectedCategory}`)
      .then((res) => setProviderInfo(res.data))
      .catch(() => console.log("error"));
  };

  return (
    <div>
      <Navbar />

      <div className="services-top">
        <div className="service-top-heading">
          <h2
            style={{
              fontWeight: "500",
              marginTop: "20px",
              padding: "0 10px",
              fontSize: "1.5rem",
            }}
          >
            Showing search results for {categoryName}
          </h2>
        </div>
      </div>

      <ServiceProviderList
        providerInfo={providerInfo}
        text="No result found"
      />

      <Footer />
    </div>
  );
}

export default SearchResult;