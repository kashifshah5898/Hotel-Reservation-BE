const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModels");
const { encryptedText } = require("../utils/Constant");

const getBookings = asyncHandler(async (req, res) => {

  const bookings = await Booking.find();

  return res
    .status(200)
    .json({ success: true, data: encryptedText(bookings) });

});

const myBookings = asyncHandler(async (req, res) => {

  const { id } = req.query

  const bookings = await Booking.find({ bookedBy: id }).populate('roomNo');

  return res
    .status(200)
    .json({ success: true, data: encryptedText(bookings) });

});

const createBooking = asyncHandler(async (req, res) => {
  const { roomNo, bookedBy, bookingStart, bookingEnd, bookedFor, additionalInfo = '' } = req.body;

  if (!roomNo || !bookedBy || !bookingStart || !bookingEnd || !bookedFor) {
    res.status(400);
    throw new Error("Please Fill all required fields");
  }

  if (new Date(bookingStart).getTime() + 24 * 60 * 60 * 1000 < new Date().getTime()) {
    res.status(400);
    throw new Error("You can not book room in previous dates");
  }


  const isBooked = await Booking.find({
    bookingStart: {
      $gte: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
    },
  });

  if (isBooked.length > 0) {
    isBooked.map((item) => {
      // Check if the requested start or end time falls within the booked slot
      if (item._id == roomNo) {
        if (
          (new Date(bookingStart) >= new Date(item.bookingStart) && new Date(bookingStart) < new Date(item.bookingEnd)) ||
          (new Date(bookingEnd) > new Date(item.bookingStart) && new Date(bookingEnd) <= new Date(item.bookingEnd))
        ) {
          res.status(400);
          throw new Error(`This Room is already booked for ${item.bookedFor}`); // The slot overlaps with a booked slot, return false
        }
      }
    });
  }


  await Booking.create({
    roomNo: roomNo,
    bookedBy: bookedBy,
    bookingStart: bookingStart,
    bookingEnd: bookingEnd,
    bookedFor: bookedFor,
    additionalInfo: additionalInfo
  });

  return res.status(201).json({ success: true, msg: "Room Booked Successfully" });

});


const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.query
  const { roomNo, bookedBy, bookingStart, bookingEnd, bookedFor, additionalInfo = '' } = req.body;

  const isBooked = await Booking.find({
    bookingStart: {
      $gte: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
    },
  });

  if (isBooked.length > 0) {
    isBooked.map((item) => {
      if (item._id != id && item.roomNo != roomNo) {
        // Check if the requested start or end time falls within the booked slot
        if (
          (new Date(bookingStart) >= new Date(item.bookingStart) && new Date(bookingStart) < new Date(item.bookingEnd)) ||
          (new Date(bookingEnd) > new Date(item.bookingStart) && new Date(bookingEnd) <= new Date(item.bookingEnd))
        ) {
          res.status(400);
          throw new Error(`This Room is already booked for ${item.bookedFor}`); // The slot overlaps with a booked slot, return false

        }
      }
    });
  }

  await Booking.findByIdAndUpdate(id, {
    roomNo: roomNo,
    bookedBy: bookedBy,
    bookingStart: bookingStart,
    bookingEnd: bookingEnd,
    bookedFor: bookedFor,
    additionalInfo: additionalInfo
  });

  res.status(200).json({ success: true, msg: "Room booking updated successfully" });
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.query

  const findRoom = await Booking.findById(id);

  if (!findRoom) {
    res.status(400);
    throw new Error("Booking not found");
  }

  await Booking.findByIdAndDelete(id);
  res.status(200).json({ success: true, msg: "Booking deleted successfully" });
});


module.exports = { getBookings, myBookings, createBooking, updateBooking, deleteBooking };
