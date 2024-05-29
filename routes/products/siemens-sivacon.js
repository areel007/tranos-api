const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../middlewares/file.uplaod");
const upload = multer({ storage });

const siemensSivacon = require("../../controllers/products/siemens-sivacon");

router
  .route("/siemens-sivacon-s8")
  .post(upload.array("imageUrl"), siemensSivacon.addSiemensSivacon);

router
  .route("/siemens-sivacon-s8/:id")
  .get(siemensSivacon.getSiemensSivacon)
  .patch(upload.array("imageUrl"), siemensSivacon.updateSiemensSivacon);

module.exports = router;
