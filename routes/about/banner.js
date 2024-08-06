const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = require("../../middlewares/file.uplaod");

const upload = multer({ storage });

const banner = require("../../controllers/about/banner");

router.route("/banner").post(upload.single("banner"), banner.addBanner);

router.route("/banner/:id").get(banner.getBanner).patch(banner.updateBanner);

module.exports = router;
