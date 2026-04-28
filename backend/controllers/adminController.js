import pool from "../config/db.js";

export const getAdmin = async (req, res)=>{
    const userId = req.params.userId;

    try{
        const result = await pool.query(
            `SELECT username , email FROM users
            WHERE id = $1 AND role = 'admin'`,
            [userId],
        )

        res.status(200).json(result.rows)
    } catch(error){
        res.status(500).json({message : "Server Error"})
        console.log(error)
    }
}