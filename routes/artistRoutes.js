const express = require("express");
const {
  getAllArtists,
  getArtistById,
  addArtist,
  updateArtist,
  deleteArtist,
} = require("../controllers/artistController");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");
const {
  validateAddArtist,
  validateUpdateArtist,
  validateDeleteArtist,
} = require("../validators/artistValidator");

const router = express.Router();

// Routes for Artists
router.get("/", authMiddleware, getAllArtists);
router.get("/:id", authMiddleware, getArtistById);
router.post("/", authMiddleware, roleMiddleware(["Admin", "Editor"]), validateAddArtist, addArtist);
router.put("/:id", authMiddleware, roleMiddleware(["Admin", "Editor"]), validateUpdateArtist, updateArtist);
router.delete("/:id", authMiddleware, roleMiddleware(["Admin", "Editor"]), validateDeleteArtist, deleteArtist);

module.exports = router;
