const mongoose = require("mongoose");
const validator = require("validator");

const accessIpSchema = new mongoose.Schema({
  access: Boolean,
  ip: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isIP(value)) {
        throw new Error("ip is invalid");
      }
    }
  },
  Agent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const accessIp = mongoose.model("AccessIp", accessIpSchema);

module.exports = accessIp;
