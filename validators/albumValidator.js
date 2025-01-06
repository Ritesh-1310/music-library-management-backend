const { check, param, validationResult } = require("express-validator");

const validateAddAlbum = [
  check("name").notEmpty().withMessage("Album name is required."),
  check("year").isInt({ min: 1900, max: new Date().getFullYear() }).withMessage("Valid release year is required."),
  check("hidden").optional().isBoolean().withMessage("Hidden must be a boolean value."),
  check("artist_id").isUUID().withMessage("Valid artist ID is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const validateUpdateAlbum = [
  param("id").isUUID().withMessage("Valid album ID is required."),
  check("name").optional().notEmpty().withMessage("Album name cannot be empty."),
  check("year").optional().isInt({ min: 1900, max: new Date().getFullYear() }).withMessage("Valid release year is required."),
  check("hidden").optional().isBoolean().withMessage("Hidden must be a boolean value."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const validateDeleteAlbum = [
  param("id").isUUID().withMessage("Valid album ID is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateAddAlbum, validateUpdateAlbum, validateDeleteAlbum };
