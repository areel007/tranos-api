const mongoose = require("mongoose");

const tranosEliteSchema = new mongoose.Schema({
  tranosEliteImages: {
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

const TranosElite = mongoose.model("TranosElite", tranosEliteSchema);

module.exports = TranosElite;
