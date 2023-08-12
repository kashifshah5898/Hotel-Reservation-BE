const express = require("express");
const routes = express.Router();
const {
  getRooms, createRoom, updateRoom, deleteRoom
} = require("../controllers/roomsController");
const { protect } = require("../middleWare/authMiddleware");

routes.get("/getRooms", getRooms);
routes.post("/createRoom", protect, createRoom);
routes.put("/updateRoom", protect, updateRoom);
routes.delete("/deleteRoom", protect, deleteRoom);

module.exports = routes;
