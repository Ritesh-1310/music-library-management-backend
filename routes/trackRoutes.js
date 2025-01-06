const express = require("express");
const { getAllTracks, getTrackById, addTrack, updateTrack, deleteTrack } = require("../controllers/trackController");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");
const { validateAddTrack, validateUpdateTrack, validateDeleteTrack } = require("../validators/trackValidator");

const router = express.Router();

router.get("/", authMiddleware, getAllTracks);
router.get("/:id", authMiddleware, getTrackById);
router.post("/add-track", authMiddleware, roleMiddleware(["Admin", "Editor"]), validateAddTrack, addTrack);
router.put("/:id", authMiddleware, roleMiddleware(["Admin", "Editor"]), validateUpdateTrack, updateTrack);
router.delete("/:id", authMiddleware, roleMiddleware(["Admin", "Editor"]), validateDeleteTrack, deleteTrack);

module.exports = router;
