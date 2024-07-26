const mongoose = require("mongoose");

const tranosEllisSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  tranosEllisImages: {
    type: String,
  },
});

const TranosEllis = mongoose.model("TranosEllis", tranosEllisSchema);

module.exports = TranosEllis;
