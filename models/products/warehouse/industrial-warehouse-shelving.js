const mongoose = require("mongoose");

const IndustrialWarehouseShelvingSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  industrialWarehouseShelvingImage: {
    type: String,
  },
});

const IndustrialWarehouseShelving = mongoose.model(
  "IndustrialWarehouseShelving",
  IndustrialWarehouseShelvingSchema
);

module.exports = IndustrialWarehouseShelving;
