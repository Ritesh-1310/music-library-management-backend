const { check, param, validationResult } = require("express-validator");

const validateAddUser = [
    check("email").isEmail().withMessage("Valid email is required."),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    check("role")
      .isIn(["Editor", "Viewer"])
      .withMessage("Role must be 'Editor' or 'Viewer'."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error", errors: errors.array() });
      }
      next();
    },
];

const validateDeleteUser = [
  param("id").isUUID().withMessage("Valid user ID is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const validateUpdatePassword = [
  check("old_password").notEmpty().withMessage("Old password is required."),
  check("new_password").isLength({ min: 6 }).withMessage("New password must be at least 6 characters long."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateAddUser, validateDeleteUser, validateUpdatePassword };
