import React from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";
import api from "../../Utils/axiosApi";
import "./BookingHistory.css";

function BookingHistory({ bookingHistory, setBookingHistory }) {
  const cancelAppointment = (booking) => {
    const id = booking.id
    api.post(`/CancelBooking/${id}`)
    .then(()=>{
      setBookingHistory((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: "cancelled" }
            : item
        )
      );
    })
    .catch((error)=>{
      alert("Something went wrong")
      console.log(error)
    })
  };
  
  return (
    <div className="booking-layout">
      {bookingHistory.map((booking, index) => (
        <div className="booking-card" key={index}>
          <div className="booking-content">
            <img
              src={`/${booking.category}.png`}
              alt="service"
              className="booking-image"
            />

            <div className="booking-details">
              <h2 className="title">{booking?.business_name}</h2>

              <span className="info">
                <User size={16} style={{ color: "purple" }} />{" "}
                <p style={{ color: "var(--primary-color)", fontWeight: "700" }}>
                  {booking?.name}
                </p>
              </span>

              <span className="info">
                <MapPin size={16} style={{ color: "red" }} /> {booking?.address}
              </span>

              <span className="info booking-date-container">
                <Calendar size={16} style={{ color: "grey" }} />
                Service on:{" "}
                <span >{dayjs(booking?.booking_date).format("DD-MM-YYYY")}</span>
              </span>

              <span className="info booking-on-date">
                <Calendar size={16} style={{ color: "grey" }} />
                On:{" "}
                <span >{dayjs(booking?.booking_date).format("DD-MM-YYYY")}</span>
              </span>

              <span className="info">
                <Clock size={16} style={{ color: "grey" }} />
                Time: <span>{booking?.booking_time}</span>
              </span>
            </div>
          </div>
          {booking.status === "active" && <div className="cancel-btn-container">
            <button
              className="cancel-btn"
              onClick={() => cancelAppointment(booking)}
              value={booking.id}
            >
              Cancel Booking
            </button>
          </div>}
          
        </div>
      ))}
    </div>
  );
}

export default BookingHistory;
