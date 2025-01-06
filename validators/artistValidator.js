const { check, param, validationResult } = require("express-validator");

const validateAddArtist = [
  check("name").notEmpty().withMessage("Artist name is required."),
  check("grammy")
    .optional()
    .isBoolean()
    .withMessage("Grammy status must be a boolean value."),
  check("hidden")
    .optional()
    .isBoolean()
    .withMessage("Hidden must be a boolean value."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const validateUpdateArtist = [
  param("id").isUUID().withMessage("Valid artist ID is required."),
  check("name")
    .optional()
    .notEmpty()
    .withMessage("Artist name cannot be empty."),
  check("grammy")
    .optional()
    .isBoolean()
    .withMessage("Grammy status must be a boolean value."),
  check("hidden")
    .optional()
    .isBoolean()
    .withMessage("Hidden must be a boolean value."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const validateDeleteArtist = [
  param("id").isUUID().withMessage("Valid artist ID is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateAddArtist, validateUpdateArtist, validateDeleteArtist };
