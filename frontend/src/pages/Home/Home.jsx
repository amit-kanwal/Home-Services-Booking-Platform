import "./Home.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState, useRef } from "react";
import Searchbar from "../../components/Searchbar/Searchbar.jsx";
import CategoryList from "../../components/CategoryList/CategoryList";
import Footer from "../../components/Footer/Footer";
import Typewriter from "typewriter-effect";
import ServiceProviderList from "../../components/ServiceProviderList/ServiceProviderList";

function Home() {
  const [categories, setCategories] = useState([]);
  const [providerInfo, setProviderInfo] = useState([]);
  const [category, setCategory] = useState("Popular");
  const serviceRef = useRef("null");

  const scroolToServices = () => {
    serviceRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    getProviderInfo(category);
  }, [category]);

  const getCategoriesList = () => {
    axios
      .get("/api/categories")
      .then((res) => {setCategories(res.data)})
      .catch((err) => console.log("error"));
  };

  const getProviderInfo = (category) => {
    axios
      .get(`/api/serviceProviderinfo?category=${category}`)
      .then((res) => {
        setProviderInfo(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log("error"));
  };

  return (
    <>
      <Navbar></Navbar>
      <section className="hero-section">
        <div className="hero-section-container">
          <div className="hero">
            <h2 className="headline">
              <div className="headline-first">
                <span className="headline-top-container">
                  <span>Trusted </span>
                  <span className="blue">
                    <span>Home </span>
                    <span>Services</span>
                  </span>
                </span>
                <span> At</span>
              </div>
              <div>
                <span className="second-headline">
                  {" "}
                  <span>Your </span>
                  <span>Fingertips</span>
                </span>
              </div>
            </h2>
            <h2 className="subheadline">
              Find best home services <span className="slash-container">/</span><span>repairs near you</span>
            </h2>
          </div>
          <Searchbar ref={serviceRef} />
        </div>
        <div className="type-writer-container">
          <div className="type-writer">
          <span>Avaliable at </span>
          <span className="type-writer-text">
            <Typewriter
              style={{ color: "var(--primary-color) !important" }}
              options={{
                strings: ["Srinagar", "Chauras", "Srikot", "Kirtinagar"],
                autoStart: true,
                loop: true,
                pauseFor: 3000,
              }}
              className="type-writer-txt"
            />
          </span>
        </div>
        </div>
      </section>
      <CategoryList categoryList={categories} />
      <h2 style={{ fontWeight: "500", marginTop: "20px", padding: "0 10px" }}>
        {category} Providers
      </h2>
      <ServiceProviderList
        providerInfo={providerInfo}
        currentCategory={category}
      />
      <Footer />
    </>
  );
}

export default Home;
