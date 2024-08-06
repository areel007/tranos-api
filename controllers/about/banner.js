const Banner = require("../../models/about/banner");

exports.addBanner = async (req, res) => {
  try {
    const newBanner = new Banner({
      banner: req.body.banner,
    });

    await newBanner.save();

    res.status(201).json({
      status: "success",
      newBanner,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const banner = await Banner.findById(bannerId);

    if (!banner) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      banner,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the banner ID is passed as a URL parameter
    const updatedBannerData = req.body.banner; // Assuming the updated banner data is in the request body

    // Find the banner by ID and update it with the new data
    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      { banner: updatedBannerData },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedBanner) {
      return res.status(404).json({
        status: "fail",
        message: "Banner not found",
      });
    }

    res.status(200).json({
      status: "success",
      updatedBanner,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
