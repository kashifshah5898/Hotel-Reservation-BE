const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");

const protect = asyncHandler(async (req, res, next) => {
  next()
  //   let token;
  //   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
  //     try {
  //       token = req.headers.authorization.split(" ")[1];
  //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //       req.user = await User.findById(decoded.id).select("-password");
  //       next();
  //     } catch (error) {
  //       res.status(400);
  //       throw new Error("Not authorized");
  //     }
  //   }
  //   if (!token) {
  //     res.status(400);
  //     throw new Error("Not authorized, no token available");
  //   }
});

module.exports = { protect };
