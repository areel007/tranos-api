const mongoose = require("mongoose");

const tranosErisSchema = new mongoose.Schema({
  tranosErisImages: {
    type: String,
  },
  description: {
    type: String,
  },
});

const TranosEris = mongoose.model("TranosEris", tranosErisSchema);

module.exports = TranosEris;
