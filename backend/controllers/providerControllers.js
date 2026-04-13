import pool from "../config/db.js";

const BASE_URL = "http://localhost:3000/uploads/";

export const getProviderInfo = async (req, res) => {
  try {
    const { category, lat, lng } = req.query;

    let result;

    if (category === "Popular") {
      result = await pool.query(`
        SELECT
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
        LIMIT 8;
      `);
    } else {
      const latitude = Number(lat);
      const longitude = Number(lng);

      result = await pool.query(
        `
        WITH provider_distances AS (
          SELECT
            u.id,
            u.role,
            p.user_id,
            p.name,
            p.image_url,
            p.category,
            p.address,
            p.rating,
            p.price,
            p.business_name,
            p.latitude,
            p.longitude,
            (
              6371 * acos(
                LEAST(
                  1,
                  GREATEST(
                    -1,
                    cos(radians($2)) *
                    cos(radians(p.latitude)) *
                    cos(radians(p.longitude) - radians($3)) +
                    sin(radians($2)) *
                    sin(radians(p.latitude))
                  )
                )
              )
            ) AS distance
          FROM users u
          JOIN service_provider_info p
            ON u.id = p.user_id
          WHERE
            u.role = 'service_provider'
            AND p.category = $1
        )
        SELECT *
        FROM provider_distances
        WHERE distance <= 20
        ORDER BY distance ASC;
        `,
        [category, latitude, longitude]
      );
    }

    const providers = result.rows.map((provider) => ({
      ...provider,
      image_url: BASE_URL + provider.image_url,
    }));

    res.status(200).json(providers);
  } catch (err) {
    console.error("Provider fetch error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};