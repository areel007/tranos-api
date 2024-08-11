const express = require("express");
const router = express.Router();

const auth = require("../../controllers/auth/auth");

router.route("/login").post(auth.loginUser);

router.route("/change-password").post(auth.changePassword);

module.exports = router;
