const express = require("express");

const authController = require("../Controller/auth");

const { validateLogin, validateSignup } = require("../../middleware/validate");

const router = express.Router();

// router.post("/loginAdmin", validateLogin, authController.postLoginAdmin);

router.post("/login", validateLogin, authController.postLogin);

// router.post("/logout", authController.postLogout);

router.post("/signup", validateSignup, authController.postSignup);

module.exports = router;
