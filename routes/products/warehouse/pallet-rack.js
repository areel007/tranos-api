const router = require("express").Router();
const palletRack = require("../../../controllers/products/warehouse/pallet-rack");
const multer = require("multer");

const storage = require("../../../middlewares/file.uplaod");

const upload = multer({ storage });

router
  .route("/warehouse/pallet-rack")
  .post(upload.array("imageUrl"), palletRack.addPalletRack);
router
  .route("/warehouse/pallet-rack/:id")
  .get(palletRack.getPalletRack)
  .patch(upload.array("imageUrl"), palletRack.updatePalletRack);

module.exports = router;
