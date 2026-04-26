import "./ProviderProfile.css";
import api from "../../Utils/axiosApi.js";
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin , Tag} from "lucide-react";

export default function ProviderProfile({provider , bookingInfo}) {
  return (
    <>
    <div className="provider-container-dashboard">
      
      <div className="provider-card-dashboard">
        <div className="avatar">
          {provider?.businessName ? provider?.businessName.charAt(0) : "?"}
        </div>

        <h2 className="business-name">{provider?.businessName}</h2>
        <p className="username">@{provider?.username}</p>

        <div className="provider-info-dashboard">
  <div className="row-provider">
    <User size={18} className="provider-name"/>
    <span>{provider?.name}</span>
  </div>

  <div className="row-provider">
    <Mail size={18} className="provider-email"/>
    <span >{provider?.email}</span>
  </div>

   <div className="row">
    <Phone size={18} className="provider-phone"/>
    <span>{provider?.phone}</span>
  </div>

  <div className="row">
    <MapPin size={18} className="provider-map-pin"/>
    <span>{provider?.address}</span>
  </div>
  <div className="row">
    

<Tag size={18} />
    <span>{provider?.category}</span>
  </div>
</div>
      </div>
    </div>
    </>    
  );
}


