const AtexPowerPanels = require("../../models/products/atex-power-panels");
const fs = require("fs");

exports.addAtexPowerPanels = async (req, res) => {
  try {
    const { title, features } = req.body;
    const newAtexPowerPanels = new AtexPowerPanels({
      title,
      features,
      atexPowerPanelsImage: req.file.path,
    });

    await newAtexPowerPanels.save();

    res.status(201).json({
      status: "success",
      message: "atex power panels successfully added",
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error,
    });
  }
};

exports.getAtexPowerPanels = async (req, res) => {
  try {
    const atexPowerPanels = await AtexPowerPanels.find();

    res.status(200).json({
      status: "success",
      atexPowerPanels,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.deleteAtexPowerPanel = async (req, res) => {
  try {
    const { id } = req.params;
    const atexPowerPanel = await AtexPowerPanels.findById(id);

    if (!atexPowerPanel) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    // Deleting image files to the file system
    for (const imageUrl of atexPowerPanel.atexPowerPanelsImage.split(",")) {
      await fs.promises.unlink(imageUrl);
    }

    // Delete the case study from the database
    await AtexPowerPanels.findByIdAndDelete(id);

    res.status(200).json({
      msg: "successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
