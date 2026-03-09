const Student = require("../models/Student");

exports.createStudent = async(req,res)=>{
 const {name,age} = req.body;

 const student = await Student.create({
  name,
  age,
  parentId:req.user._id
 });

 res.json(student);
};

exports.getStudents = async(req,res)=>{
 const students = await Student.find({parentId:req.user._id});
 res.json(students);
};