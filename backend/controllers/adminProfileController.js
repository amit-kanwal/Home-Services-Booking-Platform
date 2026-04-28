import pool from "../config/db.js";

export const getAdminProfileData = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
            COUNT(CASE WHEN role = 'customer' THEN 1 END) AS total_customers,
            COUNT(CASE WHEN role = 'service_provider' THEN 1 END) AS total_providers
            FROM users;`
        )

        const bookingCount = await pool.query(
            `SELECT 
            COUNT(CASE WHEN status != 'cancelled' THEN 1 END) AS total_bookings,
            COUNT(CASE WHEN status = 'active' THEN 1 END) AS active_booking
            FROM bookings;`
        )

        res.status(200).json(
            {
                total_customers: result.rows[0].total_customers,
                total_providers: result.rows[0].total_providers,
                total_bookings: bookingCount.rows[0].total_bookings,
                active_booking: bookingCount.rows[0].active_booking
            }
        )
    } catch (error) {
        res.status(500).json({ message: "Server error" })
        console.log(error)
    }
}