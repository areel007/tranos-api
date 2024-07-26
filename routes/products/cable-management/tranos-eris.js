const router = require("express").Router();
const TranosEris = require("../../../controllers/products/cable-management/tranos-eris");
const multer = require("multer");
const storage = require("../../../middlewares/file.uplaod");

const upload = multer({ storage });

router
  .route("/cable-management/tranos-eris")
  .post(upload.array("imageUrl"), TranosEris.addTranosEris);

router
  .route("/cable-management/tranos-eris/:id")
  .get(TranosEris.getTranosEris)
  .patch(upload.array("imageUrl"), TranosEris.updateTranosEris);

module.exports = router;
