const SiemensSimosec = require("../../models/products/siemens-simosec");
const fs = require("fs");

exports.addSiemensSimosec = async (req, res) => {
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

    const newSiemensSimosec = new SiemensSimosec({
      title,
      description,
      siemensSimosecImages: path,
    });

    await newSiemensSimosec.save();

    res.status(201).json({
      msg: "successfully added",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getSiemensSimosec = async (req, res) => {
  try {
    const { id } = req.params;
    const siemensSimosec = await SiemensSimosec.findById(id);

    if (!siemensSimosec) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    res.status(200).json({
      siemensSimosec,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateSiemensSimosec = async (req, res) => {
  let path = "";
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the existing document in the database
    const siemensSimosec = await SiemensSimosec.findById(id);

    if (req.files) {
      for (const imageUrl of siemensSimosec.siemensSimosecImages.split(",")) {
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
      path = siemensSimosec.siemensSimosecImages;
    }

    if (!siemensSimosec) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    await SiemensSimosec.findByIdAndUpdate(
      id,
      {
        title,
        description,
        siemensSimosecImages: path,
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
