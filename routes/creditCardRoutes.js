const express = require("express");
const routes = express.Router();
const {
    getCreditCardDetails, createCreditCardDetails, updateCreditCardDetails
} = require("../controllers/creditCardController");
const { protect } = require("../middleWare/authMiddleware");

routes.get("/getCreditCardDetails", protect, getCreditCardDetails);
routes.post("/createCreditCardDetails", protect, createCreditCardDetails);
routes.put("/updateCreditCardDetails", protect, updateCreditCardDetails);


module.exports = routes;
