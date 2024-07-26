const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../middlewares/file.uplaod");
const upload = multer({ storage });

const siemensSimosec = require("../../controllers/products/siemens-simosec");

router
  .route("/siemens-simosec")
  .post(upload.array("imageUrl"), siemensSimosec.addSiemensSimosec);

router
  .route("/siemens-simosec/:id")
  .get(siemensSimosec.getSiemensSimosec)
  .patch(upload.array("imageUrl"), siemensSimosec.updateSiemensSimosec);

module.exports = router;
