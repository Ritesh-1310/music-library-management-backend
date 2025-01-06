const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const getUsers = async (req, res) => {
  try {
    const { limit = 5, offset = 0, role } = req.query;

    const query = role ? { role } : {};
    const users = await User.find(query)
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    res.status(200).json({
      status: 200,
      message: "Users retrieved successfully.",
      data: users,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error.",
      data: null,
      error: error.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        status: 400,
        message: "Email, password, and role are required.",
        data: null,
        error: "Validation error.",
      });
    }

    if (!["Editor", "Viewer"].includes(role)) {
      return res.status(400).json({
        status: 400,
        message: "Role must be 'Editor' or 'Viewer'.",
        data: null,
        error: "Validation error.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message: "Email already exists.",
        data: null,
        error: "Conflict error.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      user_id: uuidv4(),
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({
      status: 201,
      message: "User added successfully.",
      data: {
        user_id: newUser.user_id,
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error.",
      data: null,
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOneAndDelete({ user_id: id });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
        data: null,
        error: "Resource not found.",
      });
    }

    res.status(200).json({
      status: 200,
      message: "User deleted successfully.",
      data: null,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error.",
      data: null,
      error: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
      return res.status(400).json({
        status: 400,
        message: "Old and new passwords are required.",
        data: null,
        error: "Validation error.",
      });
    }

    const user = await User.findOne({ user_id: req.user.user_id });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
        data: null,
        error: "Resource not found.",
      });
    }

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        message: "Old password is incorrect.",
        data: null,
        error: "Validation error.",
      });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      status: 200,
      data: {
        user_id: user.user_id,
      },
      message: "Password updated successfully.",
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error.",
      data: null,
      error: error.message,
    });
  }
};

module.exports = { getUsers, addUser, deleteUser, updatePassword };
