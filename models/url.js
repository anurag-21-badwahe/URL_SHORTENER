const mongoose = require("mongoose");

const urlScheme = new mongoose.Schema({
  shortURLId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  totalVisits: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

const URL = mongoose.model("url", urlScheme);

module.exports = URL;
