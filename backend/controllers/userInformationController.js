import pool from "../config/db.js";

export async function getUserInfo(req , res){
    try{
        if(req.user.role == 'customer'){
        const result = await pool.query(
        `SELECT
                u.id,
                u.role,
                c.user_id,
                c.name,
                c.address,
                u.email,
                c.contact,
                c.latitude,
                c.longitude
            FROM users u
            JOIN customer_info c
            ON u.id = c.user_id
            WHERE u.id = $1
            ;`,
        [req.user.id],
      );
    res.status(200).json(result.rows);
    }
    } catch(err){
    console.error(err);
    res.status(500).json({ message: "Server Error" });
    }
    
}