const HeroImage = require("../../../models/home/hero-images/hero.images");

exports.postHeroImageOne = async (req, res) => {
  try {
    const { image } = req.body;

    const newHeroImageOne = new HeroImage.HeroImageOne({
      image,
    });

    await newHeroImageOne.save();
    res.status(201).json({
      newHeroImageOne,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while saving the hero images",
      error: error.message,
    });
  }
};

exports.postHeroImageTwo = async (req, res) => {
  try {
    const { image } = req.body;

    const newHeroImageTwo = new HeroImage.HeroImageTwo({
      image,
    });

    await newHeroImageTwo.save();
    res.status(201).json({
      newHeroImageTwo,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while saving the hero images",
      error: error.message,
    });
  }
};

exports.postHeroImageThree = async (req, res) => {
  try {
    const { image } = req.body;

    const newHeroImageThree = new HeroImage.HeroImageThree({
      image,
    });

    await newHeroImageThree.save();
    res.status(201).json({
      newHeroImageThree,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while saving the hero images",
      error: error.message,
    });
  }
};

exports.getHeroImageOne = async (req, res) => {
  const { id } = req.params;
  try {
    const heroImageOne = await HeroImage.HeroImageOne.findById(id);
    res.status(200).json({
      heroImageOne,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the hero images",
      error: error.message,
    });
  }
};

exports.getHeroImageTwo = async (req, res) => {
  const { id } = req.params;
  try {
    const heroImageTwo = await HeroImage.HeroImageTwo.findById(id);
    res.status(200).json({
      heroImageTwo,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the hero images",
      error: error.message,
    });
  }
};

exports.getHeroImageThree = async (req, res) => {
  const { id } = req.params;
  try {
    const heroImageThree = await HeroImage.HeroImageThree.findById(id);
    res.status(200).json({
      heroImageThree,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the hero images",
      error: error.message,
    });
  }
};

exports.updateHeroImageOne = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;
  try {
    const updatedHeroImageOne = await HeroImage.HeroImageOne.findByIdAndUpdate(
      id,
      { image },
      { new: true }
    );
    res.status(200).json({
      updatedHeroImageOne,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the hero images",
      error: error.message,
    });
  }
};

exports.updateHeroImageTwo = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;
  try {
    const updatedHeroImageTwo = await HeroImage.HeroImageTwo.findByIdAndUpdate(
      id,
      { image },
      { new: true }
    );
    res.status(200).json({
      updatedHeroImageTwo,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the hero images",
      error: error.message,
    });
  }
};

exports.updateHeroImageThree = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;
  try {
    const updatedHeroImageThree =
      await HeroImage.HeroImageThree.findByIdAndUpdate(
        id,
        { image },
        { new: true }
      );
    res.status(200).json({
      updatedHeroImageThree,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the hero images",
      error: error.message,
    });
  }
};
