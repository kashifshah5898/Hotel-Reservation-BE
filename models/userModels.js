const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Add name"] },
    userName: {
      type: String,
      unique: [true, "user name already exists"],
      required: [true, "Add user name"],
    },
    email: {
      type: String,
      unique: [true, "email already exists"],
      required: [true, "Add Email"],
    },
    password: { type: String, required: [true, "Add password"] },
    gender: { type: String },
    role: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
