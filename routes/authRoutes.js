const express = require("express");
const { signup, login, logout } = require("../controllers/authController");
const { validateSignup, validateLogin } = require("../validators/authValidator");

const router = express.Router();

// Signup route
router.post("/signup", validateSignup, signup);

// Login route
router.post("/login", validateLogin, login);

// Logout route
router.get("/logout", logout);

module.exports = router;
