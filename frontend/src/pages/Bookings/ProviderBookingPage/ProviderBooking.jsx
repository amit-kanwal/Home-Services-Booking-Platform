import React from 'react'
import './ProviderBooking.css'
import ProviderNav from '../../../components/ProviderLogin/ProviderNav'
import TabComponent from '../../../components/Tabs/TabComponent';
import { useState , useEffect} from 'react';
import api from '../../../Utils/axiosApi';
import { Box } from "@mui/material";
import ProviderBookingHistory from "../../../components/ProviderBookingHistory/ProviderBookingHistory.jsx"

function ProviderBooking() {
    const user = JSON.parse(localStorage.getItem('user'))
    const providerId = user.id;
    const [tab, setTab] = useState("active");
    const [booking, setBookingHistory] = useState([]);

    useEffect(() => {
    if (!providerId) return;

    api
      .get(`/bookings/provider/${providerId}`)
      .then((res) => {
        setBookingHistory(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, [providerId]);

  const filterBookings = booking.filter((item) => {
  if (tab === "active") {
    const bookingDate = new Date(item.booking_date);
    const today = new Date();

    const diffTime = bookingDate - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return item.status === "active" && diffDays >= 0;
  }

  return item.status === tab;
});
  return (
    <>
    <ProviderNav />
    <h2 className="booking-heading">My Bookings</h2>
    <TabComponent tab={tab} setTab={setTab} />
    <Box sx={{ mt: 3 }}>
        <ProviderBookingHistory bookingHistory={filterBookings} setBookingHistory = {setBookingHistory} providerId={providerId}/>
      </Box>
    </>
  )
}

export default ProviderBooking