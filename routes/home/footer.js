const express = require("express");
const router = express.Router();

const footer = require("../../controllers/home/footer");

router.route("/footer").post(footer.addFooter);
router.route("/footer/:id").get(footer.getFooter).patch(footer.updateFooter);

module.exports = router;
