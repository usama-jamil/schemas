const mongoose = require("mongoose");
const validator = require("validator");

const saleSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
    trim: true
  },
  ContactNumber: {
    type: String,
    required: true,
    trim: true
  },
  Time: { type: Date, default: new Date().toLocaleTimeString() },
  Date: {
    type: Date,
    default: Date.now
  },
  Status: {
    type: String,
    enum: ["CallBack", "Transfer", "Pending"],
    default: "Pending"
  },
  KickBack: "",
  State: String,
  City: String,
  ZipCode: Number,
  Email: String,
  MotherMediansName: String,
  SocialSecurityNumber: String,
  Notes: String
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
