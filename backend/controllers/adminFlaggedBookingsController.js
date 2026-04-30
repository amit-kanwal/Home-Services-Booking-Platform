import pool from '../config/db.js'

export const getFlaggedBookings = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
            b.id,
            b.booking_date,
            b.booking_time,
            b.user_id,
            b.provider_id,

            c.name AS customer_name,
            c.contact AS customer_contact,
            u.email AS customer_email,

            p.name AS provider_name,
            p.contact AS provider_contact

            FROM bookings b

            JOIN users u 
            ON u.id = b.user_id

            JOIN customer_info c 
            ON c.user_id = b.user_id

            JOIN service_provider_info p 
            ON p.user_id = b.provider_id

            WHERE b.status = 'active'
            AND b.booking_date <= NOW() - INTERVAL '7 days';`
    )

    res.status(200).json(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}