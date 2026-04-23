import React from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";
// import "./BookingHistoryList.css"; // optional

function BookingHistory({ bookingHistory}) {
  // console.log(bookingHistory)

  // const cancelAppointment = (booking) => {
  //   // Replace with your axios call
  //   console.log("Cancel booking:", booking.id);

  //   // Example:
  //   // api.delete(`/booking/${booking.id}`)
  //   //   .then(() => alert("Booking cancelled"))
  //   //   .catch(() => alert("Error cancelling booking"));
  // };

  return (
    <div className="booking-layout">
      {bookingHistory.map((booking, index) => (
        <div className="booking-card" key={index}>
          <div className="booking-content">
            
            {booking?.businessList?.name && (
              <img
                src={booking?.businessList?.images[0]?.url}
                alt="service"
                className="booking-image"
              />
            )}

            <div className="booking-details">
              <h2 className="title">{booking.businessList?.name}</h2>

              <h3 className="info">
                <User size={16} /> {booking.businessList?.contactPerson}
              </h3>

              <h3 className="info">
                <MapPin size={16} /> {booking.businessList?.address}
              </h3>

              <h3 className="info">
                <Calendar size={16} />
                Service on: <span>{booking.date}</span>
              </h3>

              <h3 className="info">
                <Clock size={16} />
                Time: <span>{booking.time}</span>
              </h3>
            </div>
          </div>

          {/* Cancel Button */}
          <button
            className="cancel-btn"
            onClick={() => cancelAppointment(booking)}
          >
            Cancel Appointment
          </button>
        </div>
      ))}
    </div>
  );
}

export default BookingHistory;