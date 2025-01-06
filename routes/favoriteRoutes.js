const express = require("express");
const { getFavorites, addFavorite, deleteFavorite } = require("../controllers/favoriteController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { validateAddFavorite, validateDeleteFavorite } = require("../validators/favoriteValidator");

const router = express.Router();

router.get("/:category", authMiddleware, getFavorites);
router.post("/add-favorite", authMiddleware, validateAddFavorite, addFavorite);
router.delete("/:id", authMiddleware, validateDeleteFavorite, deleteFavorite);

module.exports = router;
