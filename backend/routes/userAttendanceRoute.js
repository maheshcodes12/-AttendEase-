const express = require("express");
const router = express.Router();
const {
	setUserAttendance,
	getUserAttendance,
	setReqAttendance,
	getReqAttendance,
} = require("../controller/userAttendance.js");

router.post("/", setUserAttendance);
router.get("/", getUserAttendance);
router.post("/req", setReqAttendance);
router.get("/req", getReqAttendance);

module.exports = router;
