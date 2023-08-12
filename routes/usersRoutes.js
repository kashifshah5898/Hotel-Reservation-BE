const express = require("express");
const routes = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  updateUserPassword,
} = require("../controllers/usersController");
const { protect } = require("../middleWare/authMiddleware");

routes.get("/", protect, getUsers);
routes.put("/:id", protect, updateUser);
routes.delete("/deleteUser/:id", protect, deleteUser);
routes.post("/login", loginUser);
routes.post("/addUser", createUser);
routes.put("/updateUserPassword/:id", protect, updateUserPassword);

module.exports = routes;
