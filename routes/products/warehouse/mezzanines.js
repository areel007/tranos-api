const router = require("express").Router();
const mezzanines = require("../../../controllers/products/warehouse/mezzanines");
const multer = require("multer");

const storage = require("../../../middlewares/file.uplaod");

const upload = multer({ storage });

router
  .route("/warehouse/standard-pallet-racks")
  .post(upload.array("imageUrl"), mezzanines.addMezzanines);
router
  .route("/warehouse/standard-pallet-racks/:id")
  .get(mezzanines.getMezzanines)
  .patch(upload.array("imageUrl"), mezzanines.updateMezzanines);

module.exports = router;
