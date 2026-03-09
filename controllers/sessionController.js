const Session = require("../models/Session");

exports.createSession = async(req,res)=>{
 const {lessonId,date,topic,summary} = req.body;

 const session = await Session.create({
  lessonId,
  date,
  topic,
  summary
 });

 res.json(session);
};

exports.getSessions = async(req,res)=>{
 const sessions = await Session.find({lessonId:req.params.id});
 res.json(sessions);
};