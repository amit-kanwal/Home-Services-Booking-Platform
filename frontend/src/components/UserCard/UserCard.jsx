import React from "react";
import { Mail, Phone, MapPin, User } from "lucide-react";
import "./UserCard.css";

const UserCard = ({userOne}) => {
  const user = {
    name: "Amit Singh",
    username: "amitkanwal34",
    email: "amitkanwal196@gmail.com",
    contact: "8218788161",
    address: "Almora",
    role: "customer",
    latitude: "29.963600",
    longitude: "77.546000",
    id: 41,
  };

  return (
    <div className="user-container">
      <div className="user-card">
        <div className="user-card-header">
          <div className="user-avatar">
            <User size={24} />
          </div>
          <div>
            <h2 className="user-name">{user.name}</h2>
            <p className="user-username">@{user.username}</p>
          </div>
        </div>

        <div className="user-card-info">
          <div className="info-row">
            <Mail size={18} className="user-icon user-blue" />
            <span>{user.email}</span>
          </div>

          <div className="info-row">
            <Phone size={18} className="user-icon user-green" />
            <span>{user.contact}</span>
          </div>

          <div className="info-row">
            <MapPin size={18} className="user-icon user-red" />
            <span>{user.address}</span>
          </div>
        </div>
        <div className="user-divider"></div>
        <div className="user-card-footer">
          <span className="user-role">{user.role}</span>
          <span className="user-id">ID: {user.id}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;