const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../middlewares/file.uplaod");
const upload = multer({ storage });

const tranosEliteRange = require("../../controllers/products/tranos-elite-range");

router
  .route("/tranos-elite-range")
  .post(upload.array("imageUrl"), tranosEliteRange.addTranosEliteRange);

router
  .route("/tranos-elite-range/:id")
  .get(tranosEliteRange.getTranosEliteRange)
  .patch(upload.array("imageUrl"), tranosEliteRange.updateTranosEliteRange);

module.exports = router;
