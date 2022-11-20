const { check, body } = require("express-validator");
const User = require("../Model/User");

exports.validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({
        email: value,
      }).then((user) => {
        if (!user) {
          return Promise.reject(
            "Email is not registered, please register to continue."
          );
        }
      });
    }),
  body("password", "Password does not Empty").not().isEmpty(),
  body(
    "password",
    "Please enter a password with only numbers and text and at least 8 characters."
  ).isLength({ min: 8 }),
];

exports.validateSignup = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({
        email: value,
      }).then((user) => {
        if (user) {
          return Promise.reject(
            "Email exists already, please pick a different one."
          );
        }
      });
    }),
  body("password", "Password does not Empty").not().isEmpty(),
  body(
    "password",
    "Please enter a password with only numbers and text and at least 8 characters."
  ).isLength({ min: 8 }),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords have to match!");
    }
    return true;
  }),
];
