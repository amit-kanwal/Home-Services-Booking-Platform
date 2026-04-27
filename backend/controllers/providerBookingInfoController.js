import pool from "../config/db.js";

export const getProviderBookingInfo = async (req, res) => {
  const providerId = req.params.providerId;
  try {
    const result = await pool.query(
    `SELECT 
    b.booking_time,
    b.booking_date,
    b.status,
    b.id,
    u.email,
    c.name,
    c.contact,
    c.address
    FROM bookings b
    JOIN users u 
    ON b.user_id = u.id
    JOIN customer_info c 
    ON b.user_id = c.user_id
    WHERE b.provider_id = $1`,
      [providerId],
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};
