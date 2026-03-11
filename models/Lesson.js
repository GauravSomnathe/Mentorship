const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
 title:{
  type:String,
  required:true,
  minlength:3
 },
 description:{
  type:String,
  required:true,
  minlength:10
 },
 mentorId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
 }
},{
 timestamps:true
});

module.exports = mongoose.model("Lesson",lessonSchema);