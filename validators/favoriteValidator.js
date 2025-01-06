const { check, param, validationResult } = require("express-validator");

const validateAddFavorite = [
  check("category")
    .isIn(["artist", "album", "track"])
    .withMessage("Category must be one of 'artist', 'album', or 'track'."),
  check("item_id").isUUID().withMessage("Valid item ID is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

const validateDeleteFavorite = [
  param("id").isUUID().withMessage("Valid favorite ID is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateAddFavorite, validateDeleteFavorite };
