const express = require("express");
const router = express.Router();

const auth = require("../../controllers/auth/auth");
const authMiddleware = require("../../middlewares/auth");

router.route("/login").post(auth.loginUser);

router.route("/change-password").post(authMiddleware, auth.changePassword);

module.exports = router;
