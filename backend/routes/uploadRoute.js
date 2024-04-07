const express = require("express");
const router = express.Router();
const uploadImage = require("../controller/uploadController.js");

router.post("/upload", uploadImage);

module.exports = router;
