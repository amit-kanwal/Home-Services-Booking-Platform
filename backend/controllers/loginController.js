import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import pool from '../config/db.js'

dotenv.config()

async function userLogin(req, res) {
  const { username, password } = req.body;

  const result = await pool.query("SELECT * from users where username = $1", [
    username,
  ]);

  if (result.rows.length == 0) {
    return res.status(404).json({
      message: "Username and password does not match",
    });
  }

  const validPassword = await bcrypt.compare(password, result.rows[0].password);

  if (!validPassword) {
    return res.status(401).json({
      message: "Username and password does not match",
    });
  }

  const user = result.rows[0];

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.status(200).json({
    id : user.id,
    role : user.role,
    token: token
  })
}

export default userLogin;
