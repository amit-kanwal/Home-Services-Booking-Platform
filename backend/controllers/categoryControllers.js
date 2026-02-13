import pool from '../config/db.js'

export const getCategories = async (req, res)=>{
  try{
    const result = await pool.query(
    'SELECT * FROM "ServiceCategory" ORDER BY id ASC'
  );
  res.status(200).json(result.rows)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  } 
}

export const createCategory = async(req, res) =>{
    const {name, icon, color} = req.body;

    const result = await pool.query(
      `INSERT INTO "ServiceCategory" (name, icon, color)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, icon, color]
    );

    res.json(result.rows[0]);
}