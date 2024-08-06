const TranosEliteRange = require("../../models/products/tranos-elite-range");
const fs = require("fs");

exports.addTranosEliteRange = async (req, res) => {
  let path = "";
  try {
    if (req.files) {
      const files = Array.isArray(req.files) ? req.files : [req.files];
      files.forEach((file) => {
        if (Array.isArray(file)) {
          file.forEach((singleFile) => {
            path += singleFile.path + ",";
          });
        } else {
          path += file.path + ",";
        }
      });
      path = path.slice(0, -1); // Remove the trailing comma
    }
    const { title, description, features } = req.body;
    const tranosEliteRange = new TranosEliteRange({
      tranosEliteImages: path,
      title,
      description,
      features,
    });

    await tranosEliteRange.save();

    res.status(201).json({
      status: "success",
      tranosEliteRange,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTranosEliteRange = async (req, res) => {
  try {
    const { id } = req.params;
    const tranosEliteRange = await TranosEliteRange.findById(id);

    if (!tranosEliteRange) {
      return res.status(404).json({ msg: "not found" });
    }

    res.status(200).json({ tranosEliteRange });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTranosEliteRange = async (req, res) => {
  let path = "";
  try {
    const { id } = req.params;
    const { title, description, features } = req.body;

    const tranosEliteRange = await TranosEliteRange.findById(id);

    if (!tranosEliteRange) {
      return res.status(404).json({ msg: "not found" });
    }

    if (req.files) {
      const oldImages = tranosEliteRange.tranosEliteImages.split(",");
      oldImages.forEach((imageUrl) => {
        fs.unlink(imageUrl, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Error deleting file:", err);
            return res.status(500).json({ message: "Error deleting file" });
          }
        });
      });

      const files = Array.isArray(req.files) ? req.files : [req.files];
      files.forEach((file) => {
        if (Array.isArray(file)) {
          file.forEach((singleFile) => {
            path += singleFile.path + ",";
          });
        } else {
          path += file.path + ",";
        }
      });
      path = path.slice(0, -1); // Remove the trailing comma
    } else {
      path = tranosEliteRange.tranosEliteImages; // Retain existing images if no new files are uploaded
    }

    await TranosEliteRange.findByIdAndUpdate(
      id,
      {
        title,
        description,
        features,
        tranosEliteImages: path,
      },
      { new: true }
    );

    res.status(200).json({ msg: "Tranos Elite updated successfully" });
  } catch (error) {
    console.error("Error updating Tranos Elite Range:", error);
    res.status(500).json({ error: error.message });
  }
};
