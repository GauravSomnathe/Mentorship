const express = require("express");
const router = express.Router();

const llmController = require("../controllers/llmController");

// Summarize text
router.post("/summarize", llmController.summarize);

module.exports = router;