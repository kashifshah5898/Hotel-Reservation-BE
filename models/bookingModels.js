const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    roomNo: { type: mongoose.Types.ObjectId, ref: 'Room' },
    bookedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    bookingStart: { type: Date, required: [true, "Add Start Time "] },
    bookingEnd: { type: Date, required: [true, "Add End Time "] },
    bookedFor: { type: String, required: [true, "Add Name "] },
    additionalInfo: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
