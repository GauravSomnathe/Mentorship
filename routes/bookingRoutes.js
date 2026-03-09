const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");
const protect = require("../middleware/authMiddleware");

// Parent books a lesson for a student
router.post("/", protect, bookingController.createBooking);

// Optional: view bookings
router.get("/", protect, bookingController.getBookings);

module.exports = router;