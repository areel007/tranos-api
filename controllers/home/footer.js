const Footer = require("../../models/home/footer");

exports.addFooter = async (req, res) => {
  try {
    const { about, phone, email } = req.body;
    const footer = new Footer({ about, phone, email });
    await footer.save();

    res.status(201).json({ msg: "footer added" });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getFooter = async (req, res) => {
  try {
    const { id } = req.params;

    const footerText = await Footer.findById(id);

    if (!footerText) {
      return res.status(404).json({
        error: "hero text not found",
      });
    }

    res.status(200).json({
      footerText,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateFooter = async (req, res) => {
  try {
    const { id } = req.params;
    const { about, phone, email } = req.body;

    const updatedFooterText = await Footer.findByIdAndUpdate(
      id,
      {
        about,
        phone,
        email,
      },
      { new: true } // To return the updated document
    );

    if (!updatedFooterText) {
      return res.status(404).json({
        error: "not found",
      });
    }

    res.status(200).json({ msg: "footer updated" });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
