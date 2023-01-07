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

  ////////////////////////
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  //////////////////////
  activity: {
    type: Object,
  },

  region: {
    type: String,
  },
  collegeName: {
    type: String,
  },
  branch: {
    type: String,
  },
  phone: {
    type: String,
  },

  //////////////////////////
  addLine1: {
    type: String,
  },
  addLine2: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  country: {
    type: String,
  },

  ////////////////////////////
  isPassReset: {
    type: Boolean,
    default: false,
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("user", UserSchema);
// User.createIndexes();
module.exports = User;
