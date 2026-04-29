import pool from "../config/db.js";

export const getCustomers = async (req, res)=>{
    try{
        const result = await pool.query(
        `SELECT
                u.id,
                u.role,
                u.username,
                c.user_id,
                c.name,
                c.address,
                u.email,
                c.contact,
            FROM users u
            JOIN customer_info c
            ON u.id = c.user_id
            ;`,
      );

      res.status(200).json(result.rows);
    } 
    catch(error){
        res.status(500).json({message : "Server Error"})
        console.log(error)
    }
}