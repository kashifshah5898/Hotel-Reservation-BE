const express = require("express");
const routes = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/usersController");
const { protect } = require("../middleWare/authMiddleware");

routes.get("/", protect, getUsers);
routes.put("/:id", protect, updateUser);
routes.delete("/:id", protect, deleteUser);
routes.post("/login", loginUser);
routes.post("/addUser", createUser);

module.exports = routes;
