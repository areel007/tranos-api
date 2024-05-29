const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../middlewares/file.uplaod");
const upload = multer({ storage });

const siemensSimoprime = require("../../controllers/products/siemens-simoprime");

router
  .route("/siemens-simoprime")
  .post(upload.array("imageUrl"), siemensSimoprime.addSiemensSimoprime);

router
  .route("/siemens-simoprime/:id")
  .get(siemensSimoprime.getSiemensSimoprime)
  .patch(upload.array("imageUrl"), siemensSimoprime.updateSiemensSimoprime);

module.exports = router;
