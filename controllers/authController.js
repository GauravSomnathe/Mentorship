const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.signup = async(req,res)=>{
 try {
  const {name,email,password,role} = req.body;

  // Validate input
  if (!name || !email || !password || !role) {
    return res.status(400).json({message:"Name, email, password, and role are required"});
  }
  if (!['parent','mentor'].includes(role)) {
    return res.status(400).json({message:"Role must be 'parent' or 'mentor'. Students are created by parents."});
  }
  if (password.length < 6) {
    return res.status(400).json({message:"Password must be at least 6 characters"});
  }

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

  res.status(201).json({
   token:generateToken(user._id)
  });
 } catch (error) {
  res.status(500).json({message: error.message});
 }
};

exports.login = async(req,res)=>{
 try {
  const {email,password} = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({message:"Email and password are required"});
  }

  const user = await User.findOne({email});

  if(!user){
   return res.status(401).json({message:"Invalid credentials"});
  }

  const match = await bcrypt.compare(password,user.password);

  if(!match){
   return res.status(401).json({message:"Invalid credentials"});
  }

  res.json({
   token:generateToken(user._id)
  });
 } catch (error) {
  res.status(500).json({message: error.message});
 }
};

exports.getMe = async(req,res)=>{
 res.json(req.user);
};