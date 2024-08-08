const express = require("express");
const router = express.Router();

const auth = require("../../controllers/auth/auth");

router.route("/users").post(auth.getAllUsers);

router.route("/users/:id").delete(auth.deleteUser);

module.exports = router;
