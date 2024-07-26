const TranosTrac = require("../../../models/products/cable-management/tranos-trac");
const fs = require("fs");

// cable trays
exports.addCableTrays = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newCableTrays = new TranosTrac.CableTrays({
      cableTraysImage: req.file.path,
      title,
      description,
    });
    await newCableTrays.save();
    res.status(201).json({
      status: "success",
      newCableTrays,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getCableTrays = async (req, res) => {
  try {
    const { id } = req.params;
    const cableTrays = await TranosTrac.CableTrays.findById(id);

    if (!cableTrays) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    res.status(200).json({
      cableTrays,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateCableTrays = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const newPath = req.file?.path;

    // Find the existing document in the database
    const cableTrays = await TranosTrac.CableTrays.findById(id);

    if (!cableTrays) {
      return res.status(404).json({ message: "Document not found" });
    }

    // If a new image is uploaded, delete the existing images
    if (newPath) {
      try {
        if (cableTrays.cableTraysImage) {
          for (const imageUrl of cableTrays.cableTraysImage.split(",")) {
            await fs.promises.unlink(imageUrl);
          }
        }
      } catch (err) {
        if (err.code !== "ENOENT") {
          // Ignore file not found error
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }
      }
    }

    // Prepare the update data
    const updateData = { title, description };
    if (newPath) {
      updateData.cableTraysImage = newPath;
    }

    // Update the document
    await TranosTrac.CableTrays.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      msg: "Updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// cable ladders
exports.addCableLadders = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newCableLadders = new TranosTrac.CableLadders({
      cableLaddersImage: req.file.path,
      title,
      description,
    });
    await newCableLadders.save();
    res.status(201).json({
      status: "success",
      newCableLadders,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getCableLadders = async (req, res) => {
  try {
    const { id } = req.params;
    const cableLadders = await TranosTrac.CableLadders.findById(id);

    if (!cableLadders) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    res.status(200).json({
      cableLadders,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateCableLadders = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const newPath = req.file?.path;

    // Find the existing document in the database
    const cableLadders = await TranosTrac.CableLadders.findById(id);

    if (!cableLadders) {
      return res.status(404).json({ message: "Document not found" });
    }

    // If a new image is uploaded, delete the existing images
    if (newPath) {
      try {
        if (cableLadders.cableLaddersImage) {
          for (const imageUrl of cableLadders.cableLaddersImage.split(",")) {
            await fs.promises.unlink(imageUrl);
          }
        }
      } catch (err) {
        if (err.code !== "ENOENT") {
          // Ignore file not found error
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }
      }
    }

    // Prepare the update data
    const updateData = { title, description };
    if (newPath) {
      updateData.cableLaddersImage = newPath;
    }

    // Update the document
    await TranosTrac.CableLadders.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      msg: "Updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// cable fittings
exports.addCableFittings = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newCableFittings = new TranosTrac.CableFittings({
      cableFittingsImage: req.file.path,
      title,
      description,
    });
    await newCableFittings.save();
    res.status(201).json({
      status: "success",
      newCableFittings,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getCableFittings = async (req, res) => {
  try {
    const { id } = req.params;
    const cableFittings = await TranosTrac.CableFittings.findById(id);

    if (!cableFittings) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    res.status(200).json({
      cableFittings,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateCableFittings = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const newPath = req.file?.path;

    // Find the existing document in the database
    const cableFittings = await TranosTrac.CableFittings.findById(id);

    if (!cableFittings) {
      return res.status(404).json({ message: "Document not found" });
    }

    // If a new image is uploaded, delete the existing images
    if (newPath) {
      try {
        if (cableFittings.cableFittingsImage) {
          for (const imageUrl of cableFittings.cableFittingsImage.split(",")) {
            await fs.promises.unlink(imageUrl);
          }
        }
      } catch (err) {
        if (err.code !== "ENOENT") {
          // Ignore file not found error
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }
      }
    }

    // Prepare the update data
    const updateData = { title, description };
    if (newPath) {
      updateData.cableFittingsImage = newPath;
    }

    // Update the document
    await TranosTrac.CableFittings.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      msg: "Updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// accessories and fasteners
exports.addAccessoriesAndFasteners = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newAccessoriesAndFasteners = new TranosTrac.AccessoriesAndFasteners({
      accessoriesAndFastenersImage: req.file.path,
      title,
      description,
    });
    await newAccessoriesAndFasteners.save();
    res.status(201).json({
      status: "success",
      newAccessoriesAndFasteners,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getAccessoriesAndFasteners = async (req, res) => {
  try {
    const { id } = req.params;
    const accessoriesAndFasteners =
      await TranosTrac.AccessoriesAndFasteners.findById(id);

    if (!accessoriesAndFasteners) {
      return res.status(404).json({
        msg: "not found",
      });
    }

    res.status(200).json({
      accessoriesAndFasteners,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateAccessoriesAndFasteners = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const newPath = req.file?.path;

    // Find the existing document in the database
    const accessoriesAndFasteners =
      await TranosTrac.AccessoriesAndFasteners.findById(id);

    if (!accessoriesAndFasteners) {
      return res.status(404).json({ message: "Document not found" });
    }

    // If a new image is uploaded, delete the existing images
    if (newPath) {
      try {
        if (accessoriesAndFasteners.accessoriesAndFastenersImage) {
          for (const imageUrl of accessoriesAndFasteners.accessoriesAndFastenersImage.split(
            ","
          )) {
            await fs.promises.unlink(imageUrl);
          }
        }
      } catch (err) {
        if (err.code !== "ENOENT") {
          // Ignore file not found error
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting file" });
        }
      }
    }

    // Prepare the update data
    const updateData = { title, description };
    if (newPath) {
      updateData.accessoriesAndFastenersImage = newPath;
    }

    // Update the document
    await TranosTrac.AccessoriesAndFasteners.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      msg: "Updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
