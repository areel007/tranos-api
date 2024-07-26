const router = require("express").Router();
const standardPalletRacks = require("../../../controllers/products/warehouse/standard-pallet-racks");
const multer = require("multer");

const storage = require("../../../middlewares/file.uplaod");

const upload = multer({ storage });

router
  .route("/warehouse/standard-pallet-racks")
  .post(upload.array("imageUrl"), standardPalletRacks.addStandardPalletRacks);
router
  .route("/warehouse/standard-pallet-racks/:id")
  .get(standardPalletRacks.getStandardPalletRacks)
  .patch(
    upload.array("imageUrl"),
    standardPalletRacks.updateStandardPalletRacks
  );

module.exports = router;
