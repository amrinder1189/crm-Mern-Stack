const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResetPinSchema = new Schema({
  email: {
    type: String,
    maxLength: 50,
    required: true,
  },
  pin: {
    type: String,
    maxLength: 6,
    required: true,
  },
});

module.exports = {
  ResetPinSchema: mongoose.model("PIN", ResetPinSchema),
};
