const express = require("express");
const router = express.Router();
const { setTimetable, getTimetable } = require("../controller/timetable.js");

router.post("/", setTimetable);
router.get("/", getTimetable);

module.exports = router;
