const express = require("express");
const { getAllAlbums, getAlbumById, addAlbum, updateAlbum, deleteAlbum } = require("../controllers/albumController");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");
const { validateAddAlbum, validateUpdateAlbum, validateDeleteAlbum } = require("../validators/albumValidator");

const router = express.Router();

router.get("/", authMiddleware, getAllAlbums);
router.get("/:id", authMiddleware, getAlbumById);
router.post("/add-album", authMiddleware, roleMiddleware(["Admin", "Editor"]), validateAddAlbum, addAlbum);
router.put("/:id", authMiddleware, roleMiddleware(["Admin", "Editor"]), validateUpdateAlbum, updateAlbum);
router.delete("/:id", authMiddleware, roleMiddleware(["Admin", "Editor"]), validateDeleteAlbum, deleteAlbum);

module.exports = router;
