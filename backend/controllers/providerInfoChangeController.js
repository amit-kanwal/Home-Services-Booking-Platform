import pool from "../config/db.js";

export const handleChange = async (req, res) => {
  const { field, value } = req.body;
  const id = req.params.userId;
  try {
    if (field == "email") {
      const checkEmail = await pool.query(
        "SELECT id FROM users WHERE email=$1 AND id != $2",
        [value, id],
      );

      if (checkEmail.rows.length > 0) {
        return res.status(400).json({
          field: "email",
        });
      }
    }

    if (field == "contact") {
      const checkPhone = await pool.query(
        "SELECT user_id FROM service_provider_info WHERE contact=$1 AND user_id != $2",
        [value, id],
      );

      if (checkPhone.rows.length > 0) {
        return res.status(400).json({
          field: "contact",
          message: "Phone number already exists",
        });
      }
    }

    let result;
    if (field === "email") {
      result = await pool.query(
        `UPDATE users
                SET email = $1
                WHERE id = $2`,
        [value, id],
      );
    } else {
      result = await pool.query(
        `UPDATE service_provider_info
                SET ${field} = $1
                WHERE user_id = $2`,
        [value, id],
      );
    }

    res.status(200).json({ message: "Value Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
