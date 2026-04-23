import pool from "../config/db.js";

export const getBookings = async (req, res) => {
  const { providerId , date} = req.params;

  try {
    const result = await pool.query(
      `SELECT booking_time 
       FROM bookings 
       WHERE provider_id = $1 
       AND booking_date = $2
       AND status = 'active'`,
      [providerId, date]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getBookingsCustomer = async (req , res)=>{
  const {customerId} = req.params;

   try {
    const result = await pool.query(
      `SELECT booking_time, booking_date, status
       FROM bookings 
       WHERE user_id = $1`,
      [customerId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
