const Student = require("../models/Student");

exports.createStudent = async(req,res)=>{
 try {
  // Check role
  if (req.user.role !== 'parent') {
    return res.status(403).json({ message: "Only parents can create students" });
  }

  const {name,age} = req.body;

  // Validate input
  if (!name || !age) {
    return res.status(400).json({ message: "Name and age are required" });
  }
  if (name.length < 2) {
    return res.status(400).json({ message: "Name must be at least 2 characters" });
  }
  if (age < 5 || age > 25) {
    return res.status(400).json({ message: "Age must be between 5 and 25" });
  }

  const student = await Student.create({
   name,
   age,
   parentId:req.user._id
  });

  res.status(201).json(student);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

exports.getStudents = async(req,res)=>{
 try {
  const students = await Student.find({parentId:req.user._id});
  res.json(students);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};