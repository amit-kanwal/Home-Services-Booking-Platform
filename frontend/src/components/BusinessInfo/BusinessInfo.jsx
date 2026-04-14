import "./BusinessInfo.css";
import { MapPin, Mail, User, Clock, CalendarPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import MySheet from "../Mysheet/Mysheet";

function BusinessInfo({ provider }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const bookAppointmentOnclick = () => {
    navigate(`/BookSercice/${userId}/${provider.id}`);
  };

  return (
    <>
      <div className="business-info">
        <div className="provider-info-container">
          <div className="avatar-provider">
            <img
              src={`../../../public/${provider.category}.png`}
              alt="ProviderImage"
              className="provider-info-image"
              onError={(e) => {
                e.target.src = "/No_Image_Available.jpg";
              }}
            ></img>
          </div>
          <div className="provider-top-infomation">
            <div className="provider-category-heading">
              {provider?.category}
            </div>
            <div className="provider-info-list provider-name">
              {provider?.businessName}
            </div>
            <div className="provider-info-list provider-detail-icon">
              <MapPin size={18} style={{ color: "red" }} />
              <span>{provider?.address}</span>
            </div>
            <div className="provider-info-list provider-detail-icon">
              <Mail size={18} style={{ color: "skyblue" }} />
              <span>{provider?.email}</span>
            </div>
          </div>
        </div>
        <div className="business-owner-info">
          <div className="provider-detail-icon">
            <User size={18} style={{ color: "purple" }} />
            <span>{provider?.name}</span>
          </div>
          <div className="provider-detail-icon">
            <Clock size={18} style={{ color: "gray" }} />
            <span>Available : 8:00 AM to 5:00 PM</span>
          </div>

          <MySheet>
            <div className="book-service" >
              <div className="book-service-btn">
                <CalendarPlus size={20} style={{ color: "white" }} />
                <span>Book Service</span>
              </div>
            </div>
          </MySheet>
        </div>
      </div>
    </>
  );
}

export default BusinessInfo;
