const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/sessionController");
const protect = require("../middleware/authMiddleware");

// Create session for lesson
router.post("/", protect, sessionController.createSession);

// Get sessions for lesson
router.get("/lesson/:id", sessionController.getSessions);

module.exports = router;