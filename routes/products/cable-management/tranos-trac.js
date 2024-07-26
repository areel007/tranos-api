const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../../../middlewares/file.uplaod");
const upload = multer({ storage });

const tranosTrac = require("../../../controllers/products/cable-management/tranos-trac");

// cable trays
router
  .route("/cable-management/cable-trays")
  .post(upload.single("imageUrl"), tranosTrac.addCableTrays);

router
  .route("/cable-management/cable-trays/:id")
  .get(tranosTrac.getCableTrays)
  .patch(upload.single("imageUrl"), tranosTrac.updateCableTrays);

// cable ladders
router
  .route("/cable-management/cable-ladders")
  .post(upload.single("imageUrl"), tranosTrac.addCableLadders);

router
  .route("/cable-management/cable-ladders/:id")
  .get(tranosTrac.getCableLadders)
  .patch(upload.single("imageUrl"), tranosTrac.updateCableLadders);

// cable fittings
router
  .route("/cable-management/cable-fittings")
  .post(upload.single("imageUrl"), tranosTrac.addCableFittings);

router
  .route("/cable-management/cable-fittings/:id")
  .get(tranosTrac.getCableFittings)
  .patch(upload.single("imageUrl"), tranosTrac.updateCableFittings);

// accessories and fasteners
router
  .route("/cable-management/accessories-and-fasteners")
  .post(upload.single("imageUrl"), tranosTrac.addAccessoriesAndFasteners);

router
  .route("/cable-management/accessories-and-fasteners/:id")
  .get(tranosTrac.getAccessoriesAndFasteners)
  .patch(upload.single("imageUrl"), tranosTrac.updateAccessoriesAndFasteners);

module.exports = router;
