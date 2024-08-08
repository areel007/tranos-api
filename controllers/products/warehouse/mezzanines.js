const Mezzanines = require("../../../models/products/warehouse/mezzanines");
const fs = require("fs");

exports.addMezzanines = async (req, res) => {
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

    const newMezzanines = new Mezzanines({
      title,
      description,
      mezzaninesImage: path,
    });

    await newMezzanines.save();

    res.status(201).json({ newMezzanines });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getMezzanines = async (req, res) => {
  try {
    const { id } = req.params;

    const mezzanines = await Mezzanines.findById(id);

    if (!mezzanines) {
      return res.status(404).json({ message: "not found" });
    }

    res.status(200).json({ mezzanines });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateMezzanines = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the existing document in the database
    const mezzanines = await Mezzanines.findById(id);

    if (!mezzanines) {
      return res.status(404).json({ msg: "not found" });
    }

    let newImagesPath = mezzanines.mezzaninesImage; // Initialize with existing images

    if (req.files && req.files.length > 0) {
      // Only delete existing images if new files are uploaded
      try {
        for (const imageUrl of mezzanines.mezzaninesImage.split(",")) {
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
    await Mezzanines.findByIdAndUpdate(
      id,
      {
        title,
        description,
        mezzaninesImages: newImagesPath,
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
