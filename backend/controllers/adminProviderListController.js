import pool from "../config/db.js";

export const getAdminProviderList = async (req, res) =>{
    try{
        const result = await pool.query(
        `SELECT
                u.id,
                u.role,
                u.username,
                p.user_id,
                p.name,
                p.category,
                p.address,
                u.email,
                p.contact
            FROM users u
            JOIN service_provider_info p
            ON u.id = p.user_id;`
      );

      res.status(200).json(result.rows);
    }
    catch(error){
        res.status(500).json({message : "Server Error"})
        console.log(error)
    }
}