const StandardPalletRacks = require("../../../models/products/warehouse/standard-pallet-racks");
const fs = require("fs");

exports.addStandardPalletRacks = async (req, res) => {
  let path = "";
  try {
    const { title, description } = req.body;
    if (req.files) {
      const files = Array.isArray(req.files) ? req.files : [req.files];
      files.forEach((file) => {
        if (Array.isArray(file)) {
          file.forEach((singleFile) => {
            path = path + singleFile.path + ",";
          });
        } else {
          path = path + file.path + ",";
        }
      });
      path = path.substring(0, path.lastIndexOf(","));
    }

    const newStandardPalletRacks = new StandardPalletRacks({
      title,
      description,
      standardPalletRacksImage: path,
    });

    await newStandardPalletRacks.save();

    res.status(201).json({ newStandardPalletRacks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getStandardPalletRacks = async (req, res) => {
  try {
    const { id } = req.params;

    const standardPalletRacks = await StandardPalletRacks.findById(id);

    if (!standardPalletRacks) {
      return res.status(404).json({ message: "not found" });
    }

    res.status(200).json({ standardPalletRacks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateStandardPalletRacks = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the existing document in the database
    const standardPalletRacks = await StandardPalletRacks.findById(id);

    if (!standardPalletRacks) {
      return res.status(404).json({ msg: "not found" });
    }

    let newImagesPath = standardPalletRacks.standardPalletRacksImage; // Initialize with existing images

    if (req.files && req.files.length > 0) {
      // Only delete existing images if new files are uploaded
      try {
        for (const imageUrl of standardPalletRacks.standardPalletRacksImage.split(
          ","
        )) {
          await fs.promises.unlink(imageUrl); // Use fs.promises.unlink for async deletion
        }
      } catch (err) {
        if (err.code !== "ENOENT") {
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }
      }

      // Collect new image paths
      newImagesPath = req.files.map((file) => file.path).join(",");
    }

    // Update the document with new description and (optionally) new image paths
    await StandardPalletRacks.findByIdAndUpdate(
      id,
      {
        title,
        description,
        standardPalletRacksImages: newImagesPath,
      },
      { new: true }
    );

    res.status(200).json({
      msg: "standard pallet racks updated successfully",
    });
  } catch (error) {
    console.error("error updating standard pallet racks:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
