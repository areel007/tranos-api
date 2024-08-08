const PalletRack = require("../../../models/products/warehouse/pallet-rack");
const fs = require("fs");

exports.addPalletRack = async (req, res) => {
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

    const newPalletRack = new PalletRack({
      title,
      description,
      palletRackImage: path,
    });

    await newPalletRack.save();

    res.status(201).json({ newPalletRack });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getPalletRack = async (req, res) => {
  try {
    const { id } = req.params;

    const palletRack = await PalletRack.findById(id);

    if (!palletRack) {
      return res.status(404).json({ message: "not found" });
    }

    res.status(200).json({ palletRack });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updatePalletRack = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the existing document in the database
    const palletRack = await PalletRack.findById(id);

    if (!palletRack) {
      return res.status(404).json({ msg: "not found" });
    }

    let newImagesPath = palletRack.palletRackImage; // Initialize with existing images

    if (req.files && req.files.length > 0) {
      // Only delete existing images if new files are uploaded
      try {
        for (const imageUrl of palletRack.palletRackImage.split(",")) {
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
    await PalletRack.findByIdAndUpdate(
      id,
      {
        title,
        description,
        palletRackImages: newImagesPath,
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
