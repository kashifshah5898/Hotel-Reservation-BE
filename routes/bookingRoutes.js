const express = require("express");
const routes = express.Router();
const {
    getBookings, createBooking, updateBooking, deleteBooking
} = require("../controllers/bookingController");
const { protect } = require("../middleWare/authMiddleware");

routes.get("/getBookings", protect, getBookings);
routes.post("/createBooking", protect, createBooking);
routes.put("/updateBooking", protect, updateBooking);
routes.delete("/deleteBooking", protect, deleteBooking);

module.exports = routes;
