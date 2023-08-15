const asyncHandler = require("express-async-handler");
const CreditCard = require("../models/creditCardModels");
const { encryptedText } = require("../utils/Constant");

const getCreditCardDetails = asyncHandler(async (req, res) => {

  const { userId } = req.query

  const cardDetail = await CreditCard.find({ userId: userId });

  if (cardDetail.length == 0) {
    return res
      .status(400)
      .json({ success: false, msg: "Card Details not found" });
  }

  return res
    .status(200)
    .json({ success: true, data: encryptedText(cardDetail) });

});

const createCreditCardDetails = asyncHandler(async (req, res) => {
  const { userId, expiryDate, cvv, cardNo } = req.body;

  if (!userId || !expiryDate || !cvv || !cardNo) {
    res.status(400);
    throw new Error("Please Fill all required fields");
  }

  const isCard = await CreditCard.findOne({ userId: userId })

  if (isCard) {
    res.status(400);
    throw new Error("Card Details already exist");
  }

  await CreditCard.create({
    userId: userId,
    expiryDate: expiryDate,
    cardNo: encryptedText(cardNo),
    cvv: cvv,
  });

  return res.status(201).json({ success: true, msg: "Card Details Added Successfully" });

});


const updateCreditCardDetails = asyncHandler(async (req, res) => {
  const { userId, expiryDate, cvv, cardNo } = req.body;

  await CreditCard.findOneAndUpdate({ userId: userId }, {
    userId: userId,
    expiryDate: expiryDate,
    cardNo: encryptedText(cardNo),
    cvv: cvv,
  });

  res.status(200).json({ success: true, msg: "Card Details Updated Successfully" });
});




module.exports = { getCreditCardDetails, createCreditCardDetails, updateCreditCardDetails };
