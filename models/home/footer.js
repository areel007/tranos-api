const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  about: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Footer = mongoose.model("Footer", footerSchema);

module.exports = Footer;
