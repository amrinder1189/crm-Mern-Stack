const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  company: {
    type: String,
    maxLength: 50,
    required: true,
  },
  address: {
    type: String,
    maxLength: 50,
    required: true,
  },
  phone: {
    type: Number,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    maxLength: 50,
    required: true,
  },
  password: {
    type: String,
    maxLength: 255,
    required: true,
  },
  refreshtoken: {
    type: String,
    maxLength: 600,
  },
});

module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
};
