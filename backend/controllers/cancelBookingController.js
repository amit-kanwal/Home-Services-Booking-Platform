import pool from "../config/db.js";

export const CancelBookings = async (req, res) => {
  const { id } = req.params;
  const status = "cancelled"
  try {
    const result = await pool.query(
      `UPDATE bookings
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id],
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" });
  }
};
