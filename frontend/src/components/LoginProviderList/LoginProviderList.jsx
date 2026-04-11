import "../ServiceProviderList/ServiceProvider.css";
import { Link } from "react-router-dom";

const LoginProviderList = ({
  providerInfo,
  text,
  currentPage,
  setCurrentPage,
}) => {
  const providersPerPage = 3;

  const startIndex = (currentPage - 1) * providersPerPage;
  const endIndex = startIndex + providersPerPage;

  const currentProviders = providerInfo.slice(startIndex, endIndex);

  const totalPages = Math.ceil(providerInfo.length / providersPerPage);

  return (
    <>
      <div className="popular-services">
        <div className="provider-info">
          {currentProviders.map((provider, index) => (
            <div className="provider-card" key={index}>
              <img
                src={provider.image_url}
                alt="ProviderImage"
                onError={(e) => {
                  e.target.src = "/No_Image_Available.jpg";
                }}
              />

              <div className="provider-card-details">
                <div className="tag-price">
                  <div className="service-tag">{provider.category}</div>
                  <div className="price">₹{provider.price}/hour</div>
                </div>

                <div className="business-name">
                  <h3>{provider.business_name}</h3>
                </div>

                <div className="provider-name" style={{ color: "blue" }}>
                  {provider.name}
                </div>

                <div className="address">{provider.address}</div>

                <Link to="/Login" className="book-btn">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No providers */}
      {providerInfo.length === 0 && (
        <div
          className="no-provider"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
          }}
        >
          {text}
        </div>
      )}

      {/* Pagination Buttons */}
      {providerInfo.length > 3 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default LoginProviderList;