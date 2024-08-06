const SiemensSivacon = require("../../models/products/tranos-elite-range");
const fs = require("fs");

exports.addSiemensSivacon = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};

exports.getSiemensSivacon = async (req, res) => {
  try {
    const { id } = req.params;
    const siemensSivacon = await SiemensSivacon.findById(id);

    if (!siemensSivacon) {
      return res.status(404).json({ msg: "not found" });
    }

    res.status(200).json({ siemensSivacon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSiemensSivacon = async (req, res) => {
  let path = "";
  try {
    const { id } = req.params;
    const { title, description, features } = req.body;

    const siemensSivacon = await SiemensSivacon.findById(id);

    if (!siemensSivacon) {
      return res.status(404).json({ msg: "not found" });
    }

    if (req.files) {
      const oldImages = siemensSivacon.siemensSivaconImages.split(",");
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
      path = siemensSivacon.siemensSivaconImages; // Retain existing images if no new files are uploaded
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

    res.status(200).json({ msg: "Tranos Elite updated successfully" });
  } catch (error) {
    console.error("Error updating Tranos Elite Range:", error);
    res.status(500).json({ error: error.message });
  }
};
