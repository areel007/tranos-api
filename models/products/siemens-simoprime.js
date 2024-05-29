const mongoose = require("mongoose");

const siemensSimoprimeSchema = new mongoose.Schema({
  siemensSimoprimeImages: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const SiemensSimoprime = mongoose.model(
  "SiemensSimoprime",
  siemensSimoprimeSchema
);

module.exports = SiemensSimoprime;
