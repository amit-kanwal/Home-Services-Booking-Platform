import "./BusinessDescription.css";

function BusinessDescription({ provider }) {
  return (
    <div className="desc-body">
      <div className="desc-container">
        <h2 className="description-heading">Description</h2>
        <p>{provider.about}</p>
      </div>
      <div className="desc-img-container">
        <div className="description-heading">Service Image</div>
        <img
          src={provider?.image}
          alt="ProviderImage"
          onError={(e) => {
            e.target.src = "/No_Image_Available.jpg";
          }}
          className="desc-img"
        ></img>
      </div>
    </div>
  );
}

export default BusinessDescription;
