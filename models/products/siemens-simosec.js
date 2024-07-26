const mongoose = require("mongoose");

const siemensSimosecSchema = new mongoose.Schema({
  siemensSimosecImages: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const SiemensSimosec = mongoose.model("SiemensSimosec", siemensSimosecSchema);

module.exports = SiemensSimosec;
