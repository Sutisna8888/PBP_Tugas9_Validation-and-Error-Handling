const express = require("express");
const registerUser = require("../Controllers/UserControllers");
const userRegisterValidation = require("../Middlewares/UserRegisterValidation");
const { validationResult } = require("express-validator");
const router = express.Router();

// Middleware untuk menangkap error validasi
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      validationMessages: errors.array().map((err) => ({ message: err.msg })),
    });
  }
  next();
};

router.post(
  "/register",
  userRegisterValidation,
  handleValidationErrors,
  registerUser
);

module.exports = router;
