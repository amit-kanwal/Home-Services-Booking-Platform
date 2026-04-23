import pool from "../config/db.js";

const bookProvider = async (req, res) => {
  const { date, time, customerId, providerId } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO bookings 
            (booking_date, booking_time, user_id, provider_id)
            VALUES ($1,$2,$3,$4)
            RETURNING user_id`,
      [date, time, customerId, providerId],
    );

    res.status(200).json({
      result : result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export { bookProvider };
