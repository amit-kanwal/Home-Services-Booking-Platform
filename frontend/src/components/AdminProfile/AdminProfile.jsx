import "../ProviderProfile/ProviderProfile.css";
import "../../pages/AdminDashboard/AdminDashboard.css"
import api from "../../Utils/axiosApi.js";
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Tag, Users, UserCheck, CalendarCheck, Clock } from "lucide-react";

export default function AdminProfile({ username, email }) {
    const [admin, setAdmin] = useState("Admin")
    const [adminData , setAdminData] = useState({
        total_customers : "",
        total_providers : "",
        total_bookings : "",
        active_booking : ""
    })

    useEffect(() => {
        username === 'amitkanwal' ? setAdmin("Amit Singh Kanwal") : setAdmin("Admin");
    }, [username])

    useEffect(() => {
        api.get('/admin/profileData')
        .then((res)=>{
            setAdminData(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])
    return (
        <>
            <div className="provider-container-dashboard">

                <div className="provider-card-dashboard">
                    <div className="avatar">
                        A
                    </div>

                    <h2 className="business-name">Admin Account</h2>
                    <p className="username">@{username}</p>

                    <div className="provider-info-dashboard">
                        <div className="row-provider">
                            <User size={18} className="provider-name" />
                            <span>{admin}</span>
                        </div>

                        <div className="row-provider admin-mail-row">
                            <Mail size={18} className="admin-mail provider-email" />
                            <span >{email}</span>
                        </div>

                        <div className="row-provider">
                        <Users size={18} color="#3B82F6"/>
                        <span>Total Customers: {adminData?.total_customers}</span>
                    </div>

                    <div className="row-provider">
                        <UserCheck size={18} color="#10B981"/>
                        <span>Total Providers: {adminData?.total_providers}</span>
                    </div>

                    <div className="row-provider">
                        <CalendarCheck size={18} color="#F59E0B"/>
                        <span>Total Bookings: {adminData?.total_bookings}</span>
                    </div>

                    <div className="row-provider">
                        <Clock size={18} color="#EF4444"/>
                        <span>Active Bookings: {adminData?.active_booking}</span>
                    </div>
                    </div>
                    
                </div>
            </div>

        </>
    );
}


