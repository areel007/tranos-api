const SiemensSimoprime = require("../../models/products/siemens-simoprime");
const fs = require("fs");

exports.addSiemensSimoprime = async (req, res) => {
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

    const newSiemensSimoprime = new SiemensSimoprime({
      title,
      description,
      siemensSimoprimeImages: path,
    });

    await newSiemensSimoprime.save();

    res.status(201).json({
      msg: "successfully added",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getSiemensSimoprime = async (req, res) => {
  try {
    const { id } = req.params;
    const siemensSimoprime = await SiemensSimoprime.findById(id);

    if (!siemensSimoprime) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    res.status(200).json({
      siemensSimoprime,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateSiemensSimoprime = async (req, res) => {
  let path = "";
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the existing document in the database
    const siemensSimoprime = await SiemensSimoprime.findById(id);

    if (req.files) {
      for (const imageUrl of siemensSimoprime.siemensSimoprimeImages.split(
        ","
      )) {
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
      path = siemensSimoprime.siemensSimoprimeImages;
    }

    if (!siemensSimoprime) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    await SiemensSimoprime.findByIdAndUpdate(
      id,
      {
        title,
        description,
        features,
        siemensSimoprimeImages: path,
      },
      { new: true }
    );

    res.status(200).json({
      msg: "updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
