const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const studentController = require("../controllers/studentController");

router.post("/",protect,studentController.createStudent);
router.get("/",protect,studentController.getStudents);

module.exports = router;