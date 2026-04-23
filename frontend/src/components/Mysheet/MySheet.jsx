import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Drawer from "@mui/material/Drawer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import "./Mysheet.css";
import api from "../../Utils/axiosApi.js";

function MySheet({ children, customerId, providerId }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const now = dayjs();
  const [showError, setShowError] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  }, [showError]);

  useEffect(() => {
    if (!providerId || !date) return;

    api
      .get(`/bookings/provider/${providerId}/${date.format("YYYY-MM-DD")}`)
      .then((res) => {
        const times = res.data.map((item) => item.booking_time);
        setBookedSlots(times);
      })
      .catch(() => {
        console.log("Error fetching booked slots");
      });
  }, [providerId, date]);

  const getTime = () => {
    const timeList = [];

    for (let i = 9; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });

      timeList.push({
        time: i + ":30 AM",
      });
    }

    for (let i = 1; i <= 3; i++) {
      timeList.push({
        time: i + ":00 PM",
      });

      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };

  const isTimeDisabled = (time) => {
    const selectedDate = date;

    if (!selectedDate.isSame(now, "day")) return false;

    const [hourMin, period] = time.split(" ");
    let [hour, minute] = hourMin.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const slotTime = selectedDate.hour(hour).minute(minute);

    return slotTime.isBefore(now);
  };

  const handleBooking = async (e) => {
    e.currentTarget.blur();

    if (!selectedTime) {
      setShowError(true);
      return;
    }

    try {
      const response = await api.post("/book", {
        date: date.format("YYYY-MM-DD"),
        time: selectedTime,
        customerId: customerId,
        providerId: providerId,
      });
      setDate(dayjs());
      setSelectedTime(null);
      setOpen(false);
      console.log(response.data);
      navigate(`/CustomerBookings/${response.data.result.user_id}`)
    } catch (error) {
      if (error.response) {
        alert("Something went wrong");
        setSelectedTime(null);
        setOpen(false);
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: "20px" }} className="sheet-container">
          <div className="sheet-top">
            <h2 className="book-services-heading">Book Service</h2>
            <CloseIcon
              onClick={(e) => {
                e.currentTarget.blur();
                setSelectedTime(null);
                setDate(dayjs());
                setOpen(false);
              }}
              style={{
                color: "rgb(125, 125, 125)",
                fontSize: "30px",
                cursor: "pointer",
              }}
            />
          </div>
          <p>Select date and time slot to book a service</p>
          <div className="select-date" style={{ margin: "20px 0" }}>
            <h3 className="select-date-heading">Select Date</h3>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              className="calender-container"
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  maxWidth: 340,
                  margin: "20px 5px",
                }}
              >
                <DateCalendar
                  value={date}
                  onChange={(newValue) => {
                    if (newValue) {
                      setDate(newValue);
                      setSelectedTime(null);
                    }
                  }}
                  minDate={dayjs()}
                />
              </Paper>
            </LocalizationProvider>
          </div>
          <div
            className="time-slot-container"
            style={{ margin: "20px 0 15px" }}
          >
            <h3 className="select-date-heading" style={{ margin: "0 0 15px" }}>
              Select Time Slot
            </h3>
            <div className="time-slot">
              {timeSlot.map((item, index) => {
                const disabledByTime = isTimeDisabled(item.time);
                const isBooked = bookedSlots.includes(item.time);

                return (
                  <button
                    key={index}
                    disabled={disabledByTime || isBooked}
                    onClick={() => setSelectedTime(item.time)}
                    className={selectedTime === item.time ? "active" : ""}
                  >
                    {item.time}
                  </button>
                );
              })}
            </div>
          </div>
          <div className={`no-time-slot`}>
            {showError && !selectedTime && <p>Please select a time slot</p>}
          </div>
          <div className="book">
            <button className="book-service-sheet" onClick={handleBooking}>
              Book
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default MySheet;
