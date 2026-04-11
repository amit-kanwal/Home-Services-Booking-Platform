import pool from "../config/db.js";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

export const providerSignup = async (req, res) => {
  try {
    let {
      fullname,
      username,
      password,
      email,
      phone,
      category,
      experience,
      address,
      description,
      price,
      business_name,
    } = req.body;

    username = username.toLowerCase();
    const role = "service_provider";
    const checkUsername = await pool.query(
      "SELECT id FROM users WHERE username=$1",
      [username],
    );

    if (checkUsername.rows.length > 0) {
      return res.status(400).json({
        field: "username",
        message: "Username already exists",
      });
    }

    const checkEmail = await pool.query("SELECT id FROM users WHERE email=$1", [
      email,
    ]);

    if (checkEmail.rows.length > 0) {
      return res.status(400).json({
        field: "email",
      });
    }

    const checkPhone = await pool.query(
      "SELECT user_id FROM service_provider_info WHERE contact=$1",
      [phone],
    );

    if (checkPhone.rows.length > 0) {
      return res.status(400).json({
        field: "phone",
        message: "Phone number already exists",
      });
    }

    const hashedPassword = await bycrpt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users 
       (username, password, email, role)
       VALUES ($1,$2,$3,$4)
       RETURNING id`,
      [username, hashedPassword, email, role],
    );

    const user_id = result.rows[0].id;
    const imageName = req.file ? req.file.filename : null;
    let latitude = null;
    let longitude = null;

    if (req.body.location) {
      const location = JSON.parse(req.body.location);
      latitude = location.latitude;
      longitude = location.longitude;
    }
    const insertIntoProvider = await pool.query(
      `INSERT INTO service_provider_info 
       (user_id, name, contact, address, about, image_url, category, price, latitude, longitude, experience_years, business_name)
       VALUES ($1,$2,$3,$4 , $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING user_id`,
      [
        user_id,
        fullname,
        phone,
        address,
        description,
        imageName,
        category,
        price,
        latitude,
        longitude,
        experience,
        business_name,
      ],
    );
    const token = jwt.sign(
      {
        id: user_id,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      id: user_id,
      role: role,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};
