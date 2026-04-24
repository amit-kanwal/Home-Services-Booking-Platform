import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const result = await pool.query(
      `SELECT password FROM users where username = $1`,
      [username],
    );

    const validPassword = await bcrypt.compare(
      oldPassword,
      result.rows[0].password,
    );

    if (!validPassword) {
      return res.status(400).json({
        field : "oldPassword",
        message: "Username and password does not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const change = await pool.query(
      `UPDATE users
      SET password = $1
      WHERE username = $2`,
      [hashedPassword,username],
    );

    res.status(201).json({message : "Password change sucessful"})


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
