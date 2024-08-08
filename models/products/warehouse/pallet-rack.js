const mongoose = require("mongoose");

const PalletRackSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  palletRackImage: {
    type: String,
  },
});

const PalletRack = mongoose.model("PalletRack", PalletRackSchema);

module.exports = PalletRack;
