const Maintenance = require("../../models/services/maintenance");

exports.postMaintenance = async (req, res) => {
  const { maintenance } = req.body;
  try {
    const newMaintenance = new Maintenance({
      maintenanceImageUrl: maintenance,
    });

    await newMaintenance.save();

    res.status(201).json({
      newMaintenance,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getMaintenance = async (req, res) => {
  try {
    const maintenanceId = req.params.id;
    const maintenance = await Maintenance.findById(maintenanceId);

    if (!maintenance) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      maintenance,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the banner ID is passed as a URL parameter
    const { maintenance } = req.body; // Assuming the updated banner data is in the request body

    // Find the banner by ID and update it with the new data
    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      id,
      { maintenanceImageUrl: maintenance },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedMaintenance) {
      return res.status(404).json({
        status: "fail",
        message: "Banner not found",
      });
    }

    res.status(200).json({
      status: "success",
      updatedMaintenance,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
