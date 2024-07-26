const mongoose = require("mongoose");

const standardPalletRacks = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  standardPalletRacksImage: {
    type: String,
  },
});

const StandardPalletRacks = mongoose.model(
  "StandardPalletRacks",
  standardPalletRacks
);

module.exports = StandardPalletRacks;
