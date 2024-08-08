const mongoose = require("mongoose");

const MezzaninesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  mezzaninesImage: {
    type: String,
  },
});

const Mezzanines = mongoose.model("Mezzanines", MezzaninesSchema);

module.exports = Mezzanines;
