import pool from "../config/db.js";
const BASE_URL = "http://localhost:3000/uploads/";

export const getInformation = async (req, res) => {
  try {
    const { category } = req.query;
    let result;
    if (category == "Popular") {
      result = await pool.query(
        `SELECT
                u.id,
                u.role,
                p.user_id,
                p.name,
                p.image_url,
                p.category,
                p.address,
                p.rating,
                p.price,
                p.business_name
            FROM users u
            JOIN service_provider_info p
            ON u.id = p.user_id
            WHERE u.role = 'service_provider'
            ORDER BY p.rating DESC
            LIMIT 8;`,
      );
    } else {
      result = await pool.query(
        `SELECT
                u.id,
                u.role,
                p.user_id,
                p.name,
                p.image_url,
                p.category,
                p.address,
                p.rating,
                p.price,
                p.business_name
            FROM users u
            JOIN service_provider_info p
            ON u.id = p.user_id
            WHERE u.role = 'service_provider' AND p.category=$1
            ;`,
        [category],
      );
    }
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
