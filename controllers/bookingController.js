const Booking = require("../models/Booking");

exports.createBooking = async(req,res)=>{
 try {
  const {studentId,lessonId} = req.body;

  const booking = await Booking.create({
   studentId,
   lessonId,
   parentId:req.user._id
  });

  res.json(booking);
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