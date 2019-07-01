const mongoose = require("mongoose");
const validator = require("validator");

const cardDetailSchema = new mongoose.Schema({
    CreditCardNumber : String,
    NameOnCard : String,
    ExpireDate: Date,
    CVC: Number,
    BankName: String,
    BankNumber: String,
    Balance:Number,
    Available: Number,
    LastPayment: Number,
    LastPayDate: Date,
    DuePayment : Number,
    DuePayDate:Date,
    InterestRate: Number

});

const CardDetail = mongoose.model("CardDetail", cardDetailSchema);

module.exports = CardDetail;
