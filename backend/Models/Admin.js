const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = mongoose.Schema({
  fName: {
    type: String,
  },
  mName: {
    type: String,
  },
  lName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  adminId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
  },
});
const User = mongoose.model("user", UserSchema);
// User.createIndexes();
module.exports = User;
