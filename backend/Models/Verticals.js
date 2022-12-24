const mongoose = require("mongoose");

const VerticalSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  courseIds: {
    type: Array,
    default: [],
  },
});

// todo: imgSrc, indexing

const Vertical = mongoose.model("vertical", VerticalSchema);
module.exports = Vertical;
