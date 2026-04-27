import React from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import dayjs from "dayjs";
import api from "../../Utils/axiosApi";
import "./BookingHistory.css";

function BookingHistory({ bookingHistory, setBookingHistory }) {

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

  const isBookingStarted = (booking) => {
    try {
      if (!booking?.booking_date || !booking?.booking_time) return false;

      const time24 = convertTo24Hour(booking.booking_time);
      const [h, m] = time24.split(":");

      const bookingDateTime = dayjs(booking.booking_date)
        .hour(Number(h))
        .minute(Number(m))
        .second(0);

      return dayjs().isAfter(bookingDateTime);
    } catch {
      return false;
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

  return (
    <div className="booking-layout">
      {bookingHistory.map((booking, index) => {
        const isDisabled = isBookingStarted(booking);

        return (
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
                  <p
                    style={{
                      color: "var(--primary-color)",
                      fontWeight: "700",
                    }}
                  >
                    {booking?.name}
                  </p>
                </span>

                <span className="info">
                  <MapPin size={16} style={{ color: "red" }} />{" "}
                  {booking?.address}
                </span>

                <span className="info booking-date-container">
                  <Calendar size={16} style={{ color: "grey" }} />
                  Service on:{" "}
                  <span>
                    {dayjs(booking?.booking_date).format("DD-MM-YYYY")}
                  </span>
                </span>

                <span className="info booking-on-date">
                  <Calendar size={16} style={{ color: "grey" }} />
                  On:{" "}
                  <span>
                    {dayjs(booking?.booking_date).format("DD-MM-YYYY")}
                  </span>
                </span>

                <span className="info">
                  <Clock size={16} style={{ color: "grey" }} />
                  Time: <span>{booking?.booking_time}</span>
                </span>
              </div>
            </div>

            {booking.status === "active" && (
              <div className="cancel-btn-container">
                <button
                  className="cancel-btn"
                  onClick={() => cancelAppointment(booking)}
                  value={booking.id}
                  disabled={isDisabled}
                  title={
                    isDisabled
                      ? "Cannot cancel after booking starts"
                      : ""
                  }
                >
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BookingHistory;