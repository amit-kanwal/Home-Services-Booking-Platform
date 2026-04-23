import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [showError, setShowError] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate = useNavigate();
  const now = dayjs();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  useEffect(() => {
    if (!open || !providerId || !date) return;
    setBookedSlots([]);
    setSelectedTime(null);

    const controller = new AbortController();

    const fetchBookings = async () => {
      try {
        const res = await api.get(
          `/bookings/provider/${providerId}/${date.format("YYYY-MM-DD")}`,
          { signal: controller.signal },
        );
        const times = res.data.map((item) => item.booking_time);
        setBookedSlots(times);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Error fetching booked slots", err);
        }
      }
    };

    fetchBookings();
    return () => {
      controller.abort();
    };
  }, [providerId, date, open]);

  const getTime = () => {
    const timeList = [];
    for (let i = 9; i <= 11; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }

    timeList.push({ time: "12:00 PM" }, { time: "12:30 PM" });
    for (let i = 1; i <= 3; i++) {
      timeList.push({ time: i + ":00 PM" });
      timeList.push({ time: i + ":30 PM" });
    }
    setTimeSlot(timeList);
  };

  const isTimeDisabled = (time) => {
    if (!date.isSame(now, "day")) return false;
    const [hourMin, period] = time.split(" ");
    let [hour, minute] = hourMin.split(":").map(Number);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    const slotTime = date.hour(hour).minute(minute).second(0);
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
      setOpen(false);
      setSelectedTime(null);
      const targetId = response.data.result?.user_id || customerId;
      navigate(`/CustomerBookings/${targetId}`);
    } catch (error) {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 400,
            maxWidth: "100vw",
            "@media (max-width:400px)": {
              width: "100%",
            },
          },
        }}
      >
        <div style={{ padding: "20px" }} className="sheet-container">
          <div className="sheet-top">
            <h2 className="book-services-heading">Book Service</h2>
            <CloseIcon
              onClick={() => {
                setOpen(false);
                setSelectedTime(null);
                setBookedSlots([]); // Clear on close
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  width: "100%",
                  margin: "20px 0",
                  maxWidth: 340,
                  overflow: "hidden",
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
                  sx={{
                    width: "100%",
                    maxWidth: 340,
                    "& .MuiPickersCalendarHeader-root": {
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    },
                    "& .MuiDayCalendar-weekContainer": {
                      justifyContent: "space-between",
                    },
                  }}
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
          <div className="no-time-slot">
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
