const SiemensSivacon = require("../../models/products/siemens-sivacon");
const fs = require("fs");

exports.addSiemensSivacon = async (req, res) => {
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
    const { title, description, features } = req.body;
    const siemensSivacon = new SiemensSivacon({
      siemensSivaconImages: path,
      title,
      description,
      features,
    });

    await siemensSivacon.save();

    res.status(201).json({
      status: "success",
      siemensSivacon,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getSiemensSivacon = async (req, res) => {
  try {
    const { id } = req.params;
    const siemensSivacon = await SiemensSivacon.findById(id);

    if (!siemensSivacon) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    res.status(200).json({
      siemensSivacon,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateSiemensSivacon = async (req, res) => {
  let path = "";
  try {
    const { id } = req.params;
    const { title, description, features } = req.body;

    // Find the existing document in the database
    const siemensSivacon = await SiemensSivacon.findById(id);

    if (req.files) {
      for (const imageUrl of siemensSivacon.siemensSivaconImages.split(",")) {
        fs.unlink(imageUrl, (err) => {
          if (err && err.code !== "ENOENT") {
            // Ignore file not found error
            console.error("Error deleting file:", err);
            return res.status(500).json({ message: "Error deleting file" });
          }
        });
      }

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
    } else {
      // If no new files are uploaded, retain the existing image paths
      path = siemensSivacon.siemensSivaconImages;
    }

    if (!siemensSivacon) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    await SiemensSivacon.findByIdAndUpdate(
      id,
      {
        title,
        description,
        features,
        siemensSivaconImages: path,
      },
      { new: true }
    );

    res.status(200).json({
      msg: "tranos elite updated successfully",
    });
  } catch (error) {
    console.error("Error updating Tranos Elite Range:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
