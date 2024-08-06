const Installation = require("../../models/services/installation-and-commission");

exports.postInstallationImage = async (req, res) => {
  const { installation } = req.body;
  try {
    const newInstallation = new Installation({
      installationImageUrl: installation,
    });

    await newInstallation.save();

    res.status(201).json({
      newInstallation,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getInstallation = async (req, res) => {
  try {
    const installationId = req.params.id;
    const installation = await Installation.findById(installationId);

    if (!installation) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      installation,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateInstallation = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the banner ID is passed as a URL parameter
    const { installation } = req.body; // Assuming the updated banner data is in the request body

    // Find the banner by ID and update it with the new data
    const updatedInstallation = await Installation.findByIdAndUpdate(
      id,
      { installationImageUrl: installation },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedInstallation) {
      return res.status(404).json({
        status: "fail",
        message: "Banner not found",
      });
    }

    res.status(200).json({
      status: "success",
      updatedInstallation,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
