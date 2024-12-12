const validator = require("validator");
const { db } = require("../database/db");
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      validationMessages: errors.array().map((err) => ({ message: err.msg })),
    });
  }

  // Periksa apakah username atau email sudah ada
  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
        const messages = [];
        if (results.some((user) => user.username === username)) {
          messages.push({ message: "Username sudah digunakan" });
        }
        if (results.some((user) => user.email === email)) {
          messages.push({ message: "Email sudah digunakan" });
        }
        return res.status(400).json({ validationMessages: messages });
      }

      // Simpan data pengguna ke database
      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password],
        (err) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ error: "Gagal menyimpan data pengguna" });
          }

          return res.status(201).json({
            message: "Berhasil register user baru",
            data: {
              username,
              email,
            },
          });
        }
      );
    }
  );
};

module.exports = registerUser;
