const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { encryptedText, decryptedText } = require("../utils/Constant");
const CreditCard = require("../models/creditCardModels");

const getUsers = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (id) {
    const user = await User.findById(id);

    return res.status(200).json({ success: true, msg: "users found", data: encryptedText(user) });
  }

  const users = await User.find();
  return res
    .status(200)
    .json({ success: true, msg: "users found", data: encryptedText(users) });
});

const createUser = asyncHandler(async (req, res) => {
  const body = req.body;

  if (!body.name || !body.userName || !body.email || !body.password) {
    res.status(400);
    throw new Error("Please Fill all required fields");
  }

  const userName = await User.findOne({
    userName: body.userName,
  });
  if (userName) {
    res.status(400);
    throw new Error("User name already exists");
  }

  const email = await User.findOne({ email: body.email });
  if (email) {
    res.status(400);
    throw new Error("email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const user = await User.create({
    name: body.name,
    userName: body.userName,
    email: body.email,
    password: hashedPassword,
    gender: body.gender,
    role: body.role
  });
  return res.status(201).json({ success: true, msg: "User created successfully" });
});

const updateUser = asyncHandler(async (req, res) => {


  const findUser = await User.findById(req.params.id);
  if (!findUser) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  const payload = {
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    gender: updatedUser.gender,
    role: updatedUser.role,
    token: {
      token: generateToken(updatedUser._id),
      expiresIn: process.env.EXPIRE_AFTER || "24h",
      expireAt: process.env.EXPIRE_AFTER
        ? new Date().getTime() + 2592000000
        : new Date().getTime() + 86400000,
    },
  };

  res.status(200).json({ success: true, msg: "User updated successfully", data: encryptedText(payload) });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id) {
    res.status(400)
    throw new error('Id not found')
  }

  const findUser = await User.findById(id);
  if (!findUser) {
    res.status(400);
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({ success: true, msg: "User deleted successfully" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(400);
    throw new Error("User Name or not Password not found");
  }

  const findUser = await User.findOne({ userName: userName });
  if (!findUser) {
    res.status(400);
    throw new Error("User not found");
  }

  if (userName && (await bcrypt.compare(password, findUser.password))) {
    const payload = {
      id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      gender: findUser.gender,
      role: findUser.role,
      token: {
        token: generateToken(findUser._id),
        expiresIn: process.env.EXPIRE_AFTER || "24h",
        expireAt: process.env.EXPIRE_AFTER
          ? new Date().getTime() + 2592000000
          : new Date().getTime() + 86400000,
      },
    };

    res.status(200).json({ success: true, data: encryptedText(payload) });
  } else {
    res.status(400);
    throw new Error("Wrong username or password");
  }
});

// generate jwt

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRE_AFTER || "24h",
  });
};

const updateUserPassword = asyncHandler(async (req, res) => {

  const { userId, oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Fill all required fields");
  }

  const findUser = await User.findById(userId);
  console.log('user found: ', findUser);
  const isTrue = await bcrypt.compare(oldPassword, findUser.password);

  if (!isTrue) {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const updateUser = await User.findByIdAndUpdate(userId, {
    password: hashedPassword
  });

  res.status(200).json({ success: true, msg: "Password updated successfully" });
});

module.exports = { getUsers, updateUser, deleteUser, createUser, loginUser, updateUserPassword };
