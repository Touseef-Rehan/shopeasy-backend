const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: "string",
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: "string",
    required: true,
    min: 6,
    max: 255,
  },
  cartitems: {
    required: false,
  },
});

module.exports = mongoose.model("users", userSchema);
