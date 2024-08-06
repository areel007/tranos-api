const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../middlewares/file.uplaod");

const upload = multer({ storage });

const installation = require("../../controllers/services/installation");

router.route("/").post(installation.postInstallationImage);
router
  .route("/:id")
  .get(installation.getInstallation)
  .patch(installation.updateInstallation);

module.exports = router;
