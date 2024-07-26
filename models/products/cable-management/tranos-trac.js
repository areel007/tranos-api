const mongoose = require("mongoose");

// cable trays
const cableTraysSchema = new mongoose.Schema({
  cableTraysImage: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const CableTrays = mongoose.model("CableTrays", cableTraysSchema);

// cable ladder
const cableLaddersSchema = new mongoose.Schema({
  cableLaddersImage: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const CableLadders = mongoose.model("CableLadders", cableLaddersSchema);

// cable fittings
const cableFittingsSchema = mongoose.Schema({
  cableFittingsImage: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const CableFittings = mongoose.model("CableFittings", cableFittingsSchema);

// accessories and fasteners
const accessoriesAndFastenersSchema = mongoose.Schema({
  accessoriesAndFastenersImage: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const AccessoriesAndFasteners = mongoose.model(
  "AccessoriesAndFasteners",
  accessoriesAndFastenersSchema
);

module.exports = {
  CableTrays,
  CableLadders,
  CableFittings,
  AccessoriesAndFasteners,
};
