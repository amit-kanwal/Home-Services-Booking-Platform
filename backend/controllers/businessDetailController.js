import pool from "../config/db.js";
const BASE_URL = "http://localhost:3000/uploads/";

export const getProviderDetail = async (req, res) => {
  try { 
    const userId = req.params.id
    const result = await pool.query(
        `SELECT
                u.id,
                u.role,
                u.email,
                p.user_id,
                p.name,
                p.image_url,
                p.category,
                p.about,
                p.address,
                p.rating,
                p.price,
                p.business_name
            FROM users u
            JOIN service_provider_info p
            ON u.id = p.user_id
            WHERE u.id = ${userId}`
      );
    const providers = result.rows.map((provider) => ({
      ...provider,
      image_url: BASE_URL + provider.image_url,
    }));
    res.status(200).json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};