const Booking = require("../models/Booking");

exports.createBooking = async(req,res)=>{
 try {
  // Check role
  if (req.user.role !== 'parent') {
    return res.status(403).json({ message: "Only parents can create bookings" });
  }

  const {studentId,lessonId} = req.body;

  // Validate input
  if (!studentId || !lessonId) {
    return res.status(400).json({ message: "StudentId and lessonId are required" });
  }

  const booking = await Booking.create({
   studentId,
   lessonId,
   parentId:req.user._id
  });

  res.status(201).json(booking);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

// Get all bookings for the current user
exports.getBookings = async(req,res)=>{
 try {
  const bookings = await Booking.find({ parentId: req.user._id });
  res.json(bookings);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};