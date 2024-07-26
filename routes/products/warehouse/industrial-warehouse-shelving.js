const router = require("express").Router();
const multer = require("multer");
const storage = require("../../../middlewares/file.uplaod");
const IndustrialWarehouseShelving = require("../../../controllers/products/warehouse/industrial-warehouse-shelving");

const upload = multer({ storage });

router
  .route("/warehouse/industrial-warehouse-shelving")
  .post(
    upload.array("imageUrl"),
    IndustrialWarehouseShelving.addIndustrialWarehouseShelving
  );

router
  .route("/warehouse/industrial-warehouse-shelving/:id")
  .get(IndustrialWarehouseShelving.getIndustrialWarehouseShelving)
  .patch(
    upload.array("imageUrl"),
    IndustrialWarehouseShelving.updateIndustrialWarehouseShelving
  );

module.exports = router;
