const express = require("express");
const routes = express.Router();
const {
    getBookings, createBooking, updateBooking, deleteBooking, myBookings
} = require("../controllers/bookingController");
const { protect } = require("../middleWare/authMiddleware");

routes.get("/getBookings", protect, getBookings);
routes.get("/myBookings", protect, myBookings);
routes.post("/createBooking", protect, createBooking);
routes.put("/updateBooking", protect, updateBooking);
routes.delete("/deleteBooking", protect, deleteBooking);

module.exports = routes;
