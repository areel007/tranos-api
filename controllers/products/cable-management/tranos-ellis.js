const TranosEllis = require("../../../models/products/cable-management/tranos-ellis");
const fs = require("fs");

exports.addTranosEllis = async (req, res) => {
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
    const { title, description } = req.body;

    const tranosEllis = new TranosEllis({
      title,
      description,
      tranosEllisImages: path,
    });

    await tranosEllis.save();

    res.status(201).json({
      status: "success",
      tranosEllis,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getTranosEllis = async (req, res) => {
  try {
    const { id } = req.params;
    const tranosEllis = await TranosEllis.findById(id);

    if (!id) {
      return res.status(404).json({ message: "not found" });
    }

    res.status(200).json({
      status: "success",
      tranosEllis,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateTranosEllis = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, title } = req.body;

    // Find the existing document in the database
    const tranosEllis = await TranosEllis.findById(id);

    if (!tranosEllis) {
      return res.status(404).json({ msg: "not found" });
    }

    let newImagesPath = tranosEllis.tranosEllisImages; // Initialize with existing images

    if (req.files && req.files.length > 0) {
      // Only delete existing images if new files are uploaded
      try {
        for (const imageUrl of tranosEllis.tranosEllisImages.split(",")) {
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
    await TranosEllis.findByIdAndUpdate(
      id,
      {
        description,
        title,
        tranosEllisImages: newImagesPath,
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
