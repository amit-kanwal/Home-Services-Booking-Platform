import React from "react";
import { Calendar, Clock, MapPin, User, Phone } from "lucide-react";
import { useState } from "react";
import dayjs from "dayjs";
import api from "../../Utils/axiosApi";
import "./ProviderBookingHistory.css"

function ProviderBookingHistory({ bookingHistory, setBookingHistory, providerId }) {

  const convertTo24Hour = (time) => {
    const [hourMin, modifier] = time.split(" ");
    let [hours, minutes] = hourMin.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours) + 12;
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}:00`;
  };

  const completed = (booking) => {
    try {
      if (!booking?.booking_date || !booking?.booking_time) return false;

      const time24 = convertTo24Hour(booking.booking_time);

      const bookingDateTime = new Date(
        `${booking.booking_date}T${time24}`
      );

      const twoHoursLater = new Date(
        bookingDateTime.getTime() + 2 * 60 * 60 * 1000
      );

      return new Date() >= twoHoursLater;

    } catch {
      return false;
    }
  };

  const markCompleted = async (booking) => {
    try {
      await api.post(`/CompleteBooking/${booking.booking_id}`);

      setBookingHistory((prev) =>
        prev.map((item) =>
          item.booking_id === booking.booking_id
            ? { ...item, status: "completed" }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const cancelAppointment = async (booking) => {
    const id = booking.id;
    try {
      await api.post(`/CancelBooking/${id}`);

      setBookingHistory((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "cancelled" } : item
        )
      );

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };
  const isCurrentOrPast = (booking) => {
    try {
      if (!booking || !booking.booking_date || !booking.booking_time) return false;

      const time24 = convertTo24Hour(booking.booking_time);
      if (!time24) return false;

      const bookingDateTime = new Date(`${booking.booking_date}T${time24}`);

      if (isNaN(bookingDateTime.getTime())) return false;

      return bookingDateTime <= new Date();
    } catch (err) {
      return false;
    }
  };

  const isBookingStarted = (booking) => {
  try {
    if (!booking?.booking_date || !booking?.booking_time) return false;

    const time24 = convertTo24Hour(booking.booking_time);

    const bookingDateTime = new Date(
      `${booking.booking_date}T${time24}`
    );

    return new Date() >= bookingDateTime;

  } catch {
    return false;
  }
};
  return (
    <div className="booking-layout">
      {bookingHistory.map((booking, index) => {
        const isDisabled = Boolean(isCurrentOrPast(booking));
        return (
          <div className="booking-card-provider" key={index}>
            <div className="booking-content">
              <div className="booking-details">
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
                  <span>{dayjs(booking?.booking_date).format("DD-MM-YYYY")}</span>
                </span>
                <span className="info">
                  <Clock size={16} style={{ color: "grey" }} />
                  Time: <span>{booking?.booking_time}</span>
                </span>
                <span className="info">
                  <Phone size={16} style={{ color: "green" }} />
                  Phone: <span>{booking?.contact}</span>
                </span>

              </div>
            </div>
            <div className="btn-container-bookings">
              {booking.status === "active" && (
              <div className="cancel-btn-container">
                <button
                  className="cancel-btn-provider"
                  onClick={() => cancelAppointment(booking)}
                  value={booking.id}
                  disabled={isBookingStarted(booking)}
                >
                  Cancel Booking
                </button>
              </div>
            )}
            {booking.status === "active" && (
              <button
                className="complete-btn"
                onClick={() => markCompleted(booking)}
                disabled={!completed(booking)}
              >
                Completed
              </button>
            )}
            </div> 
          </div>
        )
      })}
    </div>
  )
}

export default ProviderBookingHistory