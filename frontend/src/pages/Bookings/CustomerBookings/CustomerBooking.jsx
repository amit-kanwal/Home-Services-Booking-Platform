import { useEffect, useState } from "react";
import BookingHistory from "../../../components/BookingHistory/BookingHistory.jsx";
import NavLogin from "../../../components/NavLogin/NavLogin";
import api from "../../../Utils/axiosApi";
import TabComponent from "../../../components/Tabs/TabComponent.jsx";
import "./CustomerBookings.css"
import { Box } from "@mui/material";

function CustomerBooking() {
  const user = JSON.parse(localStorage.getItem('user'))
  const customerId = user.id
  const [booking, setBookingHistory] = useState([]);
  const [tab, setTab] = useState('active')

  useEffect(() => {
    if (!customerId) return;

    api
      .get(`/bookings/customer/${customerId}`)
      .then((res) => {
        setBookingHistory(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, [customerId]);

  const filterBookings = booking.filter(
    (item) => item.status === tab
      
  )

  return (
    <>
      <NavLogin />
      <h2 className="booking-heading">
        My Bookings
      </h2>
      <TabComponent tab={tab} setTab={setTab}/>
      <Box sx={{ mt: 3 }}>
  <BookingHistory bookingHistory={filterBookings} />
</Box>
    </>
  );
}

export default CustomerBooking;