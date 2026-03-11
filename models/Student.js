const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
 name:{
  type:String,
  required:true,
  minlength:2
 },
 age:{
  type:Number,
  required:true,
  min:5,
  max:25
 },
 parentId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
 }
},{
 timestamps:true
});

module.exports = mongoose.model("Student",studentSchema);