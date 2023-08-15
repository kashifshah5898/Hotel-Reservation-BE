const asyncHandler = require("express-async-handler");
const Room = require("../models/roomModels");
const { encryptedText, decryptedText } = require("../utils/Constant");

const getRooms = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (id) {
    const room = await Room.findById(id);

    return res.status(200).json({ success: true, data: encryptedText(room) });
  }

  const rooms = await Room.find();
  return res
    .status(200)
    .json({ success: true, data: encryptedText(rooms) });
});

const createRoom = asyncHandler(async (req, res) => {
  const { number, additionalInfo } = req.body;

  if (!number) {
    res.status(400);
    throw new Error("Please Fill all required fields");
  }

  const roomNumber = await Room.findOne({
    number: number,
  });

  if (roomNumber) {
    res.status(400);
    throw new Error("Room Number Already Exists");
  }

  await Room.create({
    number: number,
    additionalInfo: additionalInfo
  });

  return res.status(201).json({ success: true, msg: "Room created successfully" });
});

const updateRoom = asyncHandler(async (req, res) => {
  const { id } = req.query
  const { number, additionalInfo } = req.body;


  const findRoom = await Room.findById(id);

  if (!findRoom) {
    res.status(400);
    throw new Error("Room not found");
  }

  await Room.findByIdAndUpdate(id, {
    number: number,
    additionalInfo: additionalInfo
  });

  res.status(200).json({ success: true, msg: "Room updated successfully" });
});

const deleteRoom = asyncHandler(async (req, res) => {
  const { id } = req.query

  const findRoom = await Room.findById(id);

  if (!findRoom) {
    res.status(400);
    throw new Error("Room not found");
  }

  await Room.findByIdAndDelete(id);
  res.status(200).json({ success: true, msg: "Room deleted successfully" });
});


module.exports = { getRooms, createRoom, updateRoom, deleteRoom };
