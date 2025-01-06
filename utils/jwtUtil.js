const jwt = require("jsonwebtoken");
const config = require("../config/env");

const generateToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
};

module.exports = { generateToken };
