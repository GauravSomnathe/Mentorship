const express = require("express");
const router = express.Router();

const lessonController = require("../controllers/lessonController");
const protect = require("../middleware/authMiddleware");

// create lesson
router.post("/", protect, lessonController.createLesson);

// get lessons
router.get("/", lessonController.getLessons);

module.exports = router;