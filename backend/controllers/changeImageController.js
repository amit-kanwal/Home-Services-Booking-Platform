import pool from "../config/db.js";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:3000/uploads/";

export const changeImage = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    
    const result = await pool.query(
      `SELECT image_url FROM service_provider_info WHERE user_id = $1`,
      [userId]
    );

    const oldImage = result.rows[0]?.image_url;

    if (oldImage) {
      const oldPath = path.join(process.cwd(), "uploads", oldImage);

      fs.unlink(oldPath, (err) => {
        if (err) console.log("Error deleting old image:", err);
      });
    }

    const imageName = req.file.filename;

    await pool.query(
      "UPDATE service_provider_info SET image_url = $1 WHERE user_id = $2",
      [imageName, userId]
    );

    const newUrl = `${BASE_URL}${imageName}`;

    res.status(200).json({
      image_url: newUrl,
      message: "Profile image updated",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};