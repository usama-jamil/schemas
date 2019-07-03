const mongoose = require("mongoose");
const validator = require("validator");

const userActivity = new mongoose.Schema({
  location: {
    type: String
  },
  Agent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const UserActivity = mongoose.model("UserActivity", userActivity);

module.exports = UserActivity;
