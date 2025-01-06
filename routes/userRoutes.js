const express = require("express");
const { getUsers, deleteUser, addUser, updatePassword} = require("../controllers/userController");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");
const { validateDeleteUser, validateAddUser, validateUpdatePassword} = require("../validators/userValidator");

const router = express.Router();

// Get all users (Admin only)
router.get("/", authMiddleware, roleMiddleware(["Admin"]), getUsers);

// Add a new user (Admin only)
router.post("/add-user", authMiddleware, roleMiddleware(["Admin"]), validateAddUser, addUser);

// Delete a user (Admin only)
router.delete("/:id", authMiddleware, roleMiddleware(["Admin"]), validateDeleteUser, deleteUser);

// Update password (Any authenticated user)
router.put("/update-password", authMiddleware, validateUpdatePassword, updatePassword);


module.exports = router;
