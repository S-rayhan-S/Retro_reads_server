const jwt = require("jsonwebtoken");
const variables = require("../config/variables");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null;

    if (!token) {
      throw new Error("No token found");
    }
    const decoded = jwt.verify(token, variables.authKey);
    if (!decoded) {
      throw new Error("Token verification failed");
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error.message });
  }
};

module.exports = auth;
