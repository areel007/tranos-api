const IndustrialWarehouseShelving = require("../../../models/products/warehouse/industrial-warehouse-shelving");
const fs = require("fs");

exports.addIndustrialWarehouseShelving = async (req, res) => {
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

    const newIndustrialWarehouseShelving = new IndustrialWarehouseShelving({
      title,
      description,
      industrialWarehouseShelvingImage: path,
    });

    await newIndustrialWarehouseShelving.save();

    res.status(201).json({ newIndustrialWarehouseShelving });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getIndustrialWarehouseShelving = async (req, res) => {
  try {
    const { id } = req.params;

    const industrialWarehouseShelving =
      await IndustrialWarehouseShelving.findById(id);

    if (!industrialWarehouseShelving) {
      return res.status(404).json({ message: "not found" });
    }

    res.status(200).json({ industrialWarehouseShelving });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateIndustrialWarehouseShelving = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the existing document in the database
    const industrialWarehouseShelving =
      await IndustrialWarehouseShelving.findById(id);

    if (!industrialWarehouseShelving) {
      return res.status(404).json({ msg: "not found" });
    }

    let newImagesPath =
      industrialWarehouseShelving.industrialWarehouseShelvingImage; // Initialize with existing images

    if (req.files && req.files.length > 0) {
      // Only delete existing images if new files are uploaded
      try {
        for (const imageUrl of industrialWarehouseShelving.industrialWarehouseShelvingImage.split(
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
    await IndustrialWarehouseShelving.findByIdAndUpdate(
      id,
      {
        title,
        description,
        industrialWarehouseShelvingImage: newImagesPath,
      },
      { new: true }
    );

    res.status(200).json({
      msg: "industrial warehouse shelving updated successfully",
    });
  } catch (error) {
    console.error("error updating industrial warehouse shelving:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
