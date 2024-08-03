const mongoose = require("mongoose");

const heroImageOneSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const heroImageTwoSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const heroImageThreeSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const HeroImageOne = mongoose.model("HeroImageOne", heroImageOneSchema);
const HeroImageTwo = mongoose.model("HeroImageTwo", heroImageTwoSchema);
const HeroImageThree = mongoose.model("HeroImageThree", heroImageThreeSchema);

module.exports = { HeroImageOne, HeroImageTwo, HeroImageThree };
