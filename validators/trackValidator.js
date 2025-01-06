const { check, param, validationResult } = require("express-validator");

const validateAddTrack = [
  check("name").notEmpty().withMessage("Track name is required."),
  check("duration").isInt({ min: 1 }).withMessage("Track duration must be a positive integer."),
  check("hidden").optional().isBoolean().withMessage("Hidden must be a boolean value."),
  check("album_id").isUUID().withMessage("Valid album ID is required."),
  check("artist_id").isUUID().withMessage("Valid artist ID is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const validateUpdateTrack = [
  param("id").isUUID().withMessage("Valid track ID is required."),
  check("name").optional().notEmpty().withMessage("Track name cannot be empty."),
  check("duration").optional().isInt({ min: 1 }).withMessage("Track duration must be a positive integer."),
  check("hidden").optional().isBoolean().withMessage("Hidden must be a boolean value."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const validateDeleteTrack = [
  param("id").isUUID().withMessage("Valid track ID is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateAddTrack, validateUpdateTrack, validateDeleteTrack };
