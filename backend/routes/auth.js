const express = require("express");
const router = express.Router();
const { login, signup } = require("../controller/user.js");

router.post("/login", login);
router.post("/", signup);

module.exports = router;
