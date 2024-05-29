const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../middlewares/file.uplaod");
const upload = multer({ storage });

const atexPowerPanels = require("../../controllers/products/atex-power-panels");

router
  .route("/atex-power-panels")
  .post(upload.single("imageUrl"), atexPowerPanels.addAtexPowerPanels)
  .get(atexPowerPanels.getAtexPowerPanels);

router
  .route("/atex-power-panels/:id")
  .delete(atexPowerPanels.deleteAtexPowerPanel);

module.exports = router;
