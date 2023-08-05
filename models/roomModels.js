const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    number: { type: String, unique: [true, 'Room Number must be unique'], required: [true, "Add Room Number"] },
    additionalInfo: { type: String },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
