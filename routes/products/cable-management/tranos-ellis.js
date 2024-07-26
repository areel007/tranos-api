const router = require("express").Router();
const multer = require("multer");
const storage = require("../../../middlewares/file.uplaod");
const TranosEllis = require("../../../controllers/products/cable-management/tranos-ellis");

const uplaod = multer({ storage });

router
  .route("/cable-management/tranos-ellis")
  .post(uplaod.array("imageUrl"), TranosEllis.addTranosEllis);

router
  .route("/cable-management/tranos-ellis/:id")
  .get(TranosEllis.getTranosEllis)
  .patch(uplaod.array("imageUrl"), TranosEllis.updateTranosEllis);

module.exports = router;
