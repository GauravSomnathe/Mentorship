const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.signup = async(req,res)=>{
 const {name,email,password,role} = req.body;

 const userExists = await User.findOne({email});

 if(userExists){
  return res.status(400).json({message:"User already exists"});
 }

 const hashedPassword = await bcrypt.hash(password,10);

 const user = await User.create({
  name,
  email,
  password:hashedPassword,
  role
 });

 res.json({
  token:generateToken(user._id)
 });
};

exports.login = async(req,res)=>{
 const {email,password} = req.body;

 const user = await User.findOne({email});

 if(!user){
  return res.status(400).json({message:"Invalid credentials"});
 }

 const match = await bcrypt.compare(password,user.password);

 if(!match){
  return res.status(400).json({message:"Invalid credentials"});
 }

 res.json({
  token:generateToken(user._id)
 });
};

exports.getMe = async(req,res)=>{
 res.json(req.user);
};