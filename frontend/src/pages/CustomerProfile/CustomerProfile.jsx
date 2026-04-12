import "./CustomerProfile.css";
import NavLogin from "../../components/NavLogin/NavLogin";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import api from "../../Utils/axiosApi.js";
import { useState, useEffect } from "react";

export default function CustomerProfileView() {
  const [customer, setCustomerInfo] = useState({});
  const navigate = useNavigate()
  

  useEffect(() => {
    api
      .get("/userInfo")
      .then((result) => {
        console.log(result.data);
        const userInfo = {
          name: result.data[0].name,
          username : result.data[0].username,
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

  return (
    <>
    <NavLogin />
    <div className="container">
      
      <div className="card">
        
          <ArrowBackIcon className="back-btn" sx={{fontSize : "2rem"}} onClick={()=> navigate("/Customer_dashboard")}/>
        
        <div className="avatar">
          {customer.name ? customer.name.charAt(0) : "?"}
        </div>

        <h2 className="name">{customer.name}</h2>
        <p className="username">@{customer.username}</p>

        <div className="info">
          <div className="row">👤 <span>{customer.name}</span></div>
          <div className="row">📧 <span>{customer.email}</span></div>
          <div className="row">📞 <span>{customer.phone}</span></div>
          <div className="row">📍 <span>{customer.address}</span></div>
        </div>
      </div>
    </div>
    </>    
  );
}


