const { check, validationResult } = require("express-validator");

const validateSignup = [
  check("email").isEmail().withMessage("Valid email is required."),
  check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  check("email").isEmail().withMessage("Valid email is required."),
  check("password").notEmpty().withMessage("Password is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateSignup, validateLogin };
