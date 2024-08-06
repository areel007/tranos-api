const Fabrication = require("../../models/services/fabrication");

exports.postFabrication = async (req, res) => {
  const { fabrication } = req.body;
  try {
    const newFabrication = new Fabrication({
      fabricationImageUrl: fabrication,
    });

    await newFabrication.save();

    res.status(201).json({
      newFabrication,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getFabrication = async (req, res) => {
  const fabricationId = req.params.id;
  try {
    const fabrication = await Fabrication.findById(fabricationId);

    if (!fabrication) {
      return res.status(404).json({
        msg: "resource not found",
      });
    }

    res.status(200).json({
      fabrication,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateFabrication = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the banner ID is passed as a URL parameter
    const { fabrication } = req.body; // Assuming the updated banner data is in the request body

    // Find the banner by ID and update it with the new data
    const updatedFabrication = await Fabrication.findByIdAndUpdate(
      id,
      { fabricationImageUrl: fabrication },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedFabrication) {
      return res.status(404).json({
        status: "fail",
        message: "Banner not found",
      });
    }

    res.status(200).json({
      status: "success",
      updatedFabrication,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
