const mongoose = require("mongoose");

const siemensSivaconSchema = new mongoose.Schema({
  siemensSivaconImages: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  features: {
    type: String,
  },
});

const SiemensSivacon = mongoose.model("SiemensSivacon", siemensSivaconSchema);

module.exports = SiemensSivacon;
