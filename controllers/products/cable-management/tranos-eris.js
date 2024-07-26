const fs = require("fs");
const TranosEris = require("../../../models/products/cable-management/tranos-eris");

exports.addTranosEris = async (req, res) => {
  let path = "";
  try {
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
    const { description } = req.body;

    const tranosEris = new TranosEris({
      description,
      tranosErisImages: path,
    });

    await tranosEris.save();

    res.status(201).json({
      status: "success",
      tranosEris,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getTranosEris = async (req, res) => {
  try {
    const { id } = req.params;
    const tranosEris = await TranosEris.findById(id);

    if (!id) {
      return res.status(404).json({ message: "not found" });
    }

    res.status(200).json({
      status: "success",
      tranosEris,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateTranosEris = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    // Find the existing document in the database
    const tranosEris = await TranosEris.findById(id);

    if (!tranosEris) {
      return res.status(404).json({ msg: "not found" });
    }

    let newImagesPath = tranosEris.tranosErisImages; // Initialize with existing images

    if (req.files && req.files.length > 0) {
      // Only delete existing images if new files are uploaded
      try {
        for (const imageUrl of tranosEris.tranosErisImages.split(",")) {
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
    await TranosEris.findByIdAndUpdate(
      id,
      {
        description,
        tranosErisImages: newImagesPath,
      },
      { new: true }
    );

    res.status(200).json({
      msg: "Tranos Elite updated successfully",
    });
  } catch (error) {
    console.error("Error updating Tranos Elite Range:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
