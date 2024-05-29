const mongoose = require("mongoose");

const atexPowerPanelsSchema = new mongoose.Schema({
  atexPowerPanelsImage: {
    type: String,
  },
  title: {
    type: String,
  },
  features: {
    type: String,
  },
});

const AtexPowerPanels = mongoose.model(
  "AtexPowerPanels",
  atexPowerPanelsSchema
);

module.exports = AtexPowerPanels;
