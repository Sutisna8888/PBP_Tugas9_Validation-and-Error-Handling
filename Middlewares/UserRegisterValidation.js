const { check } = require("express-validator");

const userRegisterValidation = [
  check("username")
    .notEmpty()
    .withMessage("Username harus diisi")
    .isLength({ min: 5, max: 10 })
    .withMessage("Username minimal 5 karakter dan maksimal 10 karakter"),
  check("email")
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Email harus valid")
    .custom((value) => {
      if (!value.endsWith("@gmail.com")) {
        throw new Error("Email harus berakhiran @gmail.com");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 5, max: 10 })
    .withMessage("Password minimal 5 karakter dan maksimal 10 karakter")
    .matches(/[A-Z]/)
    .withMessage("Password harus mengandung minimal satu huruf besar")
    .matches(/[\W_]().,<>/)
    .withMessage("Password harus mengandung minimal satu simbol"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password harus diisi")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password dan Confirm Password harus sama");
      }
      return true;
    }),
];

module.exports = userRegisterValidation;
