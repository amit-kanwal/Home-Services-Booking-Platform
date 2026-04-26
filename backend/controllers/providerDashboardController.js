import pool from "../config/db.js";
const BASE_URL = "http://localhost:3000/uploads/";

export const getProvider = async (req, res)=>{
try{
    const userId = req.params.userId;
    let result = await pool.query(
        `SELECT
                u.id,
                u.username,
                u.email,
                p.user_id,
                p.name,
                p.image_url,
                p.category,
                p.address,
                p.about,
                p.price,
                p.business_name,
                p.contact
            FROM users u
            JOIN service_provider_info p
            ON u.id = p.user_id
            WHERE u.id = $1`,
            [userId],
      );
    const providers = result.rows.map((provider) => ({
      ...provider,
      image_url: BASE_URL + provider.image_url,
    }));
    res.status(200).json(providers);
} catch(error){
    console.log(error)
    res.status(500).json({ message: "Server Error" })
}
}