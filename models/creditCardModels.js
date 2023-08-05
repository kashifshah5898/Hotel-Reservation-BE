const mongoose = require("mongoose");

const creditCardSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    expiryDate: { type: Date, required: [true, "Add Expiry Date "] },
    cardNo: { type: String, required: [true, "Add Card Number "] },
    cvv: { type: String, required: [true, "Add CVV "] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Credit-Card", creditCardSchema);
